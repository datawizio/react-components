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
  const { showCheckAll, checkAllTitle, checkAllKey } = props;

  let defaultExpandedKeys = props.defaultExpandedKeys;
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
    defaultExpandedKeys.push(checkAllKey);
  }

  return (
    <>
      <AntTree
        {...props}
        treeData={treeData}
        defaultExpandedKeys={defaultExpandedKeys}
      />
    </>
  );
};

Tree.defaultProps = {
  showCheckAll: false,
  checkAllTitle: "Check All",
  checkAllKey: "-1",
  defaultExpandedKeys: []
};

export default Tree;
