import React, { useState, useCallback } from "react";

import { TreeSelect as AntTreeSelect, Drawer } from "antd";
import Input from "../Input";

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

  showDrawer?: boolean;
}

export interface FCTreeSelectProps
  extends React.FC<TreeSelectProps<SelectValue>> {}

export interface FCTreeSelect extends FCTreeSelectProps {
  TreeNode: typeof AntTreeSelect.TreeNode;
}

const TreeSelect: FCTreeSelect = props => {
  const {
    showCheckAll,
    checkAllTitle,
    checkAllKey,
    showDrawer,
    ...restProps
  } = props;

  const [drawerVisible, setDrawerVisible] = useState(false);

  const handlerDrawerClose = useCallback(() => {
    const activeElement = document.activeElement as HTMLElement;
    activeElement.blur();
    setDrawerVisible(false);
  }, [setDrawerVisible]);

  let drawerProps = {};
  if (showDrawer) {
    drawerProps = {
      dropdownClassName: "drawer-dropdown",
      listHeight: window.innerHeight,
      onFocus: e => {
        setDrawerVisible(true);
      },
      dropdownRender: menu => {
        return (
          <Drawer
            className="drawer-select-tree"
            title="123"
            onClose={handlerDrawerClose}
            visible={drawerVisible}
          >
            <Input />
            {menu}
          </Drawer>
        );
      }
    };
  }

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
      treeDefaultExpandedKeys={treeExpandedKeys}
      {...drawerProps}
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
