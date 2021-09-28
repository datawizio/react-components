import React from "react";

import { Tree as AntTree } from "antd";
import { TreeProps as AntTreeProps } from "antd/lib/tree";
import { TreeNodeNormal } from "antd/lib/tree/Tree";

import "./index.less";

export interface TreeProps extends AntTreeProps {
  /**
   * Показать/не показывать чекбокс `Check all`
   */
  showCheckAll?: boolean;

  /**
   * Текст для чекбокса `Check all`
   */
  checkAllTitle?: string;

  /**
   * Ключ для чекбокса `Check all`
   */
  checkAllKey?: string;

  /**
   * Отключать ли кликабельность чекбокса `Check all`
   */
  isAllDisabled?: boolean;
}

const Tree: React.FC<TreeProps> = props => {
  const {
    showCheckAll,
    checkAllTitle,
    checkAllKey,
    isAllDisabled,
    defaultExpandedKeys,
    expandedKeys,
    selectedKeys,
    onSelect,
    ...restProps
  } = props;

  let cDefaultExpandedKeys = defaultExpandedKeys;
  let cExpandedKeys = expandedKeys;
  let treeData: TreeNodeNormal[] = props.treeData;

  if (showCheckAll) {
    treeData = [
      {
        key: checkAllKey,
        title: checkAllTitle,
        children: props.treeData,
        className: "tree-check-all",
        disabled: isAllDisabled
      }
    ];
    if (cDefaultExpandedKeys.indexOf(checkAllKey)) {
      cDefaultExpandedKeys.push(checkAllKey);
    }
    if (cExpandedKeys.indexOf(checkAllKey)) {
      cExpandedKeys.push(checkAllKey);
    }
  }

  return (
    <>
      <AntTree
        {...restProps}
        treeData={treeData}
        defaultExpandedKeys={cDefaultExpandedKeys}
        expandedKeys={cExpandedKeys}
        selectedKeys={selectedKeys}
        onSelect={onSelect}
      />
    </>
  );
};

Tree.defaultProps = {
  showCheckAll: false,
  checkAllTitle: "Check All",
  checkAllKey: "-1",
  defaultExpandedKeys: [],
  expandedKeys: [],
  isAllDisabled: false,
};

export default Tree;
