import React, { useState, useCallback, useEffect } from "react";

import Tree, { TreeProps } from "../Tree";
import { AntTreeNodeProps } from "antd/lib/tree";

import SearchInput from "../SearchInput";

import { recursiveFilterTreeData } from "../../utils/resursiveFilter";

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
  searchCondition?: (node: AntTreeNodeProps, value: string) => boolean;

  /**
   * Функция для передачи компонта поля Input
   */
  renderInput?: (handleSearchInputChange: (e: any) => void) => React.Component;
}

function defaultSearchCondition(node, value) {
  return node.title.includes(value);
}

const TreeSearch: React.FC<TreeSearchProps> = props => {
  const {
    showSearchInput,
    searchValue,
    renderInput,
    searchInputPlaceholder,
    onCheck
  } = props;

  const [treeData, setTreeData] = useState(props.treeData);
  const [expandedKeys, setExpandedKeys] = useState(props.expandedKeys);
  const [checkedKeys, setCheckedKeys] = useState(props.checkedKeys);

  const searchCondition = props.searchCondition
    ? props.searchCondition
    : defaultSearchCondition;

  const filterData = useCallback(
    value => {
      if (value) {
        const { data, keys } = recursiveFilterTreeData(
          value,
          props.treeData,
          searchCondition
        );

        setTreeData(data);
        setExpandedKeys(keys);
        return;
      }

      setTreeData(props.treeData);
      setExpandedKeys(props.expandedKeys);
    },
    [props.treeData, props.expandedKeys, searchCondition]
  );

  const handleSearchInputChange = useCallback(
    e => {
      filterData(e.target.value);
    },
    [filterData]
  );

  const handleTreeExpand = useCallback(
    expandedKeys => {
      setExpandedKeys(expandedKeys);
    },
    [setExpandedKeys]
  );

  const handleTreeCheck = useCallback(
    (checkedKeys, halfChecled) => {
      setCheckedKeys(checkedKeys);
      onCheck && onCheck(checkedKeys, halfChecled);
    },
    [setCheckedKeys, onCheck]
  );

  useEffect(() => {
    if (searchValue) {
      filterData(searchValue);
    }
  }, [searchValue, filterData]);

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
        {...props}
        treeData={treeData}
        expandedKeys={expandedKeys}
        onExpand={handleTreeExpand}
        onCheck={handleTreeCheck}
        checkedKeys={checkedKeys}
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
