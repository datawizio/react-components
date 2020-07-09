import React from "react";
import clsx from "clsx";

import { TreeSelect as AntTreeSelect } from "antd";

import {
  TreeSelectProps as AntTreeSelectProps,
  SelectValue
} from "antd/lib/tree-select";
import { DataNode } from "rc-tree-select/es/interface";

import "./index.less";

export interface TreeSelectProps<VT> extends AntTreeSelectProps<VT> {
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
   * Уберает отступы
   */
  flat?: boolean;
}

export interface FCTreeSelectProps
  extends React.FC<TreeSelectProps<SelectValue>> {}

export interface FCTreeSelect extends FCTreeSelectProps {
  TreeNode: typeof AntTreeSelect.TreeNode;
}

const TreeSelect: FCTreeSelect = props => {
  const {
    flat,
    className,
    showCheckAll,
    checkAllTitle,
    checkAllKey,
    ...restProps
  } = props;

  let treeExpandedKeys = props.treeDefaultExpandedKeys;
  let treeData: DataNode[] = props.treeData;

  if (showCheckAll) {
    treeData = [
      {
        key: checkAllKey,
        title: checkAllTitle,
        children: props.treeData,
        className: "tree-check-all"
      }
    ];
    treeExpandedKeys.push(checkAllKey);
  }

  return (
    <AntTreeSelect
      {...restProps}
      treeData={treeData}
      className={clsx(className, "dw-tree-select")}
      treeDefaultExpandedKeys={treeExpandedKeys}
      dropdownClassName={clsx("dw-tree-select__dropdown", {
        "dw-tree-select__dropdown--flat": flat
      })}
    />
  );
};

TreeSelect.defaultProps = {
  maxTagCount: 10,
  treeDefaultExpandedKeys: [],
  showCheckAll: false,
  checkAllTitle: "Check all",
  checkAllKey: "-1"
};

TreeSelect.TreeNode = AntTreeSelect.TreeNode;

export default TreeSelect;
