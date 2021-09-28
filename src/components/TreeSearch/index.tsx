import React, {
  ReactText,
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
  useContext
} from "react";
import { Empty } from "antd";
import Tree, { TreeProps } from "../Tree";
import { AntTreeNodeProps } from "antd/lib/tree";
import SearchInput from "../SearchInput";
import { Key } from "rc-tree-select/es/interface";
import {
  flattenOptions,
  filterOptions
} from "rc-tree-select/es/utils/valueUtil";
import { unTree } from "../../utils/data/tree";
import "./index.less";
import ConfigContext from "../ConfigProvider/context";

export interface AntTreeNodePropsExtended extends AntTreeNodeProps {
  parentKey?: string;
}

export interface TreeSearchProps extends TreeProps {
  locale?: {
    /**
     * Placeholder для строки поиска
     */
    searchInputPlaceholder?: string;

    /**
     * Текст пустого результата при поиске
     */
    emptySearchResultText?: string;
  };

  /**
   * Строка поиска
   */
  searchValue?: string;

  /**
   * Функция, которая сетит строку поиска
   */
  setSearchValue?: (value: string) => void;

  /**
   * Показывать/не показывать строку поиска
   */
  showSearchInput?: boolean;

  /**
   * Функция сравнения, по умолчанию будет проверяться вхождение подстроки `value` в строку `node.title`
   */
  searchCondition?: (value: string, node: AntTreeNodeProps) => boolean;

  /**
   * Функция для передачи компонта поля Input
   */
  renderInput?: (handleSearchInputChange: (e: any) => void) => React.Component;
}

function defaultSearchCondition(searchValue, node) {
  return String(node.title)
    .toLowerCase()
    .includes(String(searchValue).toLowerCase());
}

const TreeSearch: React.FC<TreeSearchProps> = props => {
  const {
    showSearchInput,
    searchValue,
    setSearchValue,
    renderInput,
    defaultExpandedKeys,
    treeData,
    searchCondition,
    checkedKeys,
    onCheck,
    ...restProps
  } = props;

  const { searchInputPlaceholder, emptySearchResultText } = props.locale;

  const { translate } = useContext(ConfigContext);
  const timeout = useRef<NodeJS.Timeout>();

  const [internalCheckedKeys, setInternalCheckedKeys] = useState<ReactText[]>(
    //@ts-ignore
    checkedKeys
  );

  const [expandedKeys, setExpandedKeys] = useState<Key[]>(defaultExpandedKeys);
  const [allDisabled, setAllDisabled] = useState<boolean>(false);

  const flatData = useMemo(() => {
    return unTree(treeData);
  }, [treeData]);

  const internalSearchCondition = useMemo(() => {
    return searchCondition ? searchCondition : defaultSearchCondition;
  }, [searchCondition]);

  const mergedTreeData = filterOptions(searchValue, treeData, {
    optionFilterProp: "title",
    filterOption: internalSearchCondition
  });

  const handleSearchInputChange = useCallback(
    e => {
      const value = e.target.value;

      clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        setSearchValue(value);
      }, 200);
    },
    [setSearchValue]
  );

  const handleTreeExpand = useCallback((keys: Key[]) => {
    setExpandedKeys(keys);
  }, []);

  const recDown = useCallback(
    (
      nodes: AntTreeNodePropsExtended[],
      value: boolean,
      nextCheckedKeysSet: Set<string | number>
    ) => {
      nodes.forEach(node => {
        if (node.disabled) return;

        value
          ? nextCheckedKeysSet.add(node.key)
          : nextCheckedKeysSet.delete(node.key);

        if (
          node.children &&
          Array.isArray(node.children) &&
          node.children.length
        ) {
          recDown(
            node.children as Array<AntTreeNodePropsExtended>,
            value,
            nextCheckedKeysSet
          );
        }
      });
    },
    []
  );

  const recUp = useCallback(
    (
      node: AntTreeNodePropsExtended,
      value: boolean,
      nextCheckedKeysSet: Set<string>
    ) => {
      const parent = flatData.find(
        item => item.key === node.parentKey || item.key === node.pId
      );
      if (!parent || !parent.key || parent.key === "-1") return;

      const checked: boolean = parent.children.every(child =>
        nextCheckedKeysSet.has(child.key)
      );

      checked
        ? nextCheckedKeysSet.add(parent.key)
        : nextCheckedKeysSet.delete(parent.key);

      recUp(parent, value, nextCheckedKeysSet);
    },
    [flatData]
  );

  const handleTreeCheck = useCallback(
    (keys, e) => {
      let nextKeys;
      let checked;

      const { node, event } = e;
      if (node.disabled) return;

      if (event === "select") {

        if (node.key === "-1" && node.checked) {
          setInternalCheckedKeys([]);
          onCheck && onCheck([], e);
          return;
        }

        const keyIdx = internalCheckedKeys.findIndex(item => item === node.key);
        checked = keyIdx === -1;

      } else {
        checked = e.checked;
      }

      if (Array.isArray(keys)) {
        nextKeys = [...keys];
      } else {
        nextKeys = [...keys.checked];
      }

      const nextCheckedKeysSet = new Set<string>(nextKeys);

      if (searchValue || event === "select") {
        checked
          ? nextCheckedKeysSet.add(node.key)
          : nextCheckedKeysSet.delete(node.key);

        if (node.children && node.children.length) {
          recDown(node.children, checked, nextCheckedKeysSet);
        }

        if (node.parentKey || node.pId) {
          recUp(node, checked, nextCheckedKeysSet);
        }

        nextKeys = Array.from(nextCheckedKeysSet);
      }

      const allIdx = nextKeys.findIndex(key => key === "-1");
      if (allIdx !== -1) nextKeys.splice(allIdx, 1);

      setInternalCheckedKeys(nextKeys);

      onCheck && onCheck(nextKeys, e);
    },
    [internalCheckedKeys, onCheck, recDown, recUp, searchValue]
  );

  const handleTreeSelect = useCallback((selectedKeys, e) => {
    handleTreeCheck(internalCheckedKeys, e);
  }, [handleTreeCheck, internalCheckedKeys]);

  useEffect(() => {
    const options = flattenOptions(treeData);
    if (searchValue) {
      setExpandedKeys(options.map(o => o.key));
      setAllDisabled(true);
    } else {
      setExpandedKeys(["-1"]);
      setAllDisabled(false);
    }
  }, [searchValue]);

  return (
    <div className="tree-search-container">
      <div className="tree-search-input" style={{ marginBottom: "15px" }}>
        {showSearchInput ? (
          renderInput ? (
            renderInput(handleSearchInputChange)
          ) : (
            <SearchInput
              onChange={handleSearchInputChange}
              placeholder={translate(searchInputPlaceholder)}
            />
          )
        ) : null}
      </div>
      {mergedTreeData.length ? (
        <Tree
          {...restProps}
          //@ts-ignore
          treeData={mergedTreeData}
          checkedKeys={internalCheckedKeys}
          expandedKeys={expandedKeys}
          selectedKeys={[]}
          checkStrictly={!!searchValue}
          isAllDisabled={allDisabled}
          onExpand={handleTreeExpand}
          onCheck={handleTreeCheck}
          onSelect={handleTreeSelect}
        />
      ) : (
        <Empty description={translate(emptySearchResultText)} />
      )}
    </div>
  );
};

TreeSearch.defaultProps = {
  locale: {
    searchInputPlaceholder: "SEARCH",
    emptySearchResultText: "NO_DATA"
  },
  showSearchInput: true,
  searchCondition: null,
  searchValue: "",
  setSearchValue: () => {}
};

export default TreeSearch;
