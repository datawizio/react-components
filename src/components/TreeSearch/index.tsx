import React, { useState, useCallback, useRef, ReactText } from "react";

import Tree, { TreeProps } from "../Tree";
import { AntTreeNodeProps } from "antd/lib/tree";

import SearchInput from "../SearchInput";

import { Key } from "rc-tree-select/es/interface";
import {
  flattenOptions,
  filterOptions
} from "rc-tree-select/es/utils/valueUtil";

import "./index.less";

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
  const checkedKeysSet = new Set<string>(internalCheckedKeys);

  const [searchFieldValue, setSearchFieldValue] = useState("");

  const internalSearchCondition = searchCondition
    ? searchCondition
    : defaultSearchCondition;

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

  // =========================== Keys ===========================
  const [expandedKeys, setExpandedKeys] = React.useState<Key[]>(
    defaultExpandedKeys
  );
  const [searchExpandedKeys, setSearchExpandedKeys] = React.useState<Key[]>(
    null
  );

  const mergedExpandedKeys = React.useMemo(() => {
    if (expandedKeys) {
      return [...expandedKeys];
    }
    return searchFieldValue ? searchExpandedKeys : expandedKeys;
  }, [expandedKeys, searchExpandedKeys]); // eslint-disable-line

  const options = flattenOptions(treeData);

  React.useEffect(() => {
    if (searchFieldValue) {
      setSearchExpandedKeys(options.map(o => o.key));
    }
  }, [searchFieldValue]); // eslint-disable-line

  const handlerTreeExpand = (keys: Key[]) => {
    setExpandedKeys(keys);
    setSearchExpandedKeys(keys);
  };

  const handleTreeCheck = useCallback(
    (_, e) => {
      const { node } = e;
      if (checkedKeysSet.has(node.key)) {
        checkedKeysSet.delete(node.key);
      } else {
        checkedKeysSet.add(node.key);
      }
      setInternalCheckedKeys(Array.from(checkedKeysSet));
      onCheck && onCheck(_, e);
    },
    [setInternalCheckedKeys, checkedKeysSet, onCheck]
  );

  const mergedTreeData = filterOptions(searchFieldValue, treeData, {
    optionFilterProp: "title",
    filterOption: internalSearchCondition
  });

  console.log(mergedExpandedKeys);
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
      <Tree
        {...restProps}
        //@ts-ignore
        treeData={mergedTreeData}
        expandedKeys={mergedExpandedKeys}
        onExpand={handlerTreeExpand}
        checkedKeys={internalCheckedKeys}
        onCheck={handleTreeCheck}
      />
    </div>
  );
};

TreeSearch.defaultProps = {
  searchValue: "",
  searchInputPlaceholder: "Search...",
  showSearchInput: false,
  searchCondition: null
};

export default TreeSearch;
