import React, {
  ReactText,
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect
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

export interface AntTreeNodePropsExtended extends AntTreeNodeProps {
  parentKey?: string;
}

export interface TreeSearchProps extends TreeProps {
  /**
   * Строка поиска
   */
  searchValue?: string;

  /**
   * Placeholder для строки поиска
   */
  searchInputPlaceholder?: string;

  /**
   * Текст пустого результата при поиске
   */
  emptySearchResultText?: string;

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
    renderInput,
    searchInputPlaceholder,
    emptySearchResultText,
    defaultExpandedKeys,
    treeData,
    searchCondition,
    checkedKeys,
    onCheck,
    ...restProps
  } = props;
  const timeout = useRef<NodeJS.Timeout>();

  const [internalCheckedKeys, setInternalCheckedKeys] = useState<ReactText[]>(
    //@ts-ignore
    checkedKeys
  );
  const [searchFieldValue, setSearchFieldValue] = useState("");
  const [expandedKeys, setExpandedKeys] = useState<Key[]>(defaultExpandedKeys);

  const flatData = useMemo(() => {
    return unTree(treeData);
  }, [treeData]);

  const internalSearchCondition = useMemo(() => {
    return searchCondition ? searchCondition : defaultSearchCondition;
  }, [searchCondition]);

  const mergedTreeData = filterOptions(searchFieldValue, treeData, {
    optionFilterProp: "title",
    filterOption: internalSearchCondition
  });

  const handleSearchInputChange = useCallback(
    e => {
      const value = e.target.value;

      clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        setSearchFieldValue(value);
      }, 200);
    },
    [setSearchFieldValue]
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
      const parent = flatData.find(item => item.key === node.parentKey);
      if (!parent || !parent.key || parent.key === "-1") return;

      const checked: boolean = parent.children.every(child =>
        nextCheckedKeysSet.has(child.key)
      );

      checked
        ? nextCheckedKeysSet.add(parent.key)
        : nextCheckedKeysSet.delete(parent.key);

      recUp(parent, value, nextCheckedKeysSet);
    },
    [treeData]
  );

  const handleTreeCheck = useCallback(
    (keys, e) => {
      let nextKeys;

      if (Array.isArray(keys)) {
        nextKeys = [...keys];
      } else {
        nextKeys = [...keys.checked];
      }

      const nextCheckedKeysSet = new Set<string>(nextKeys);

      const { node, checked } = e;

      if (node.disabled) return;

      if (searchFieldValue) {
        checked
          ? nextCheckedKeysSet.add(node.key)
          : nextCheckedKeysSet.delete(node.key);

        if (node.children && node.children.length) {
          recDown(node.children, checked, nextCheckedKeysSet);
        }

        if (node.parentKey) {
          recUp(node, checked, nextCheckedKeysSet);
        }

        nextKeys = Array.from(nextCheckedKeysSet);
      }

      const allIdx = nextKeys.findIndex(key => key === "-1");
      if (allIdx !== -1) nextKeys.splice(allIdx, 1);

      setInternalCheckedKeys(nextKeys);
    },
    [recDown, recUp, searchFieldValue]
  );

  useEffect(() => {
    const options = flattenOptions(treeData);
    searchFieldValue
      ? setExpandedKeys(options.map(o => o.key))
      : setExpandedKeys(["-1"]);
  }, [searchFieldValue]);

  return (
    <div className="tree-search-container">
      <div className="tree-search-input">
        {showSearchInput ? (
          renderInput ? (
            renderInput(handleSearchInputChange)
          ) : (
            <SearchInput
              onChange={handleSearchInputChange}
              placeholder={searchInputPlaceholder}
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
          checkStrictly={!!searchFieldValue}
          onExpand={handleTreeExpand}
          onCheck={handleTreeCheck}
        />
      ) : (
        <Empty description={emptySearchResultText} />
      )}
    </div>
  );
};

TreeSearch.defaultProps = {
  searchValue: "",
  searchInputPlaceholder: "SEARCH",
  emptySearchResultText: "EMPTY_SEARCH_CATEGORIES",
  showSearchInput: true,
  searchCondition: null
};

export default TreeSearch;
