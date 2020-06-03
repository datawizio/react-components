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
}

const Tree: React.FC<TreeProps> = props => {
  const {
    showCheckAll,
    checkAllTitle,
    checkAllKey,
    defaultExpandedKeys,
    expandedKeys,
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
        className: "tree-check-all"
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
      />
    </>
  );
};

Tree.defaultProps = {
  showCheckAll: false,
  checkAllTitle: "Check All",
  checkAllKey: "-1",
  defaultExpandedKeys: [],
  expandedKeys: []
};

export default Tree;
