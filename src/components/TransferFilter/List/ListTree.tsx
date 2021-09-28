import React, { useEffect, useState } from "react";

import { Tree } from "antd";

import useTreeData from "../hooks/useTreeData";
import { DataNode } from "rc-tree-select/es/interface";
import { EventDataNode } from "rc-tree/es/interface";
import { ICheckedItem } from "../types";

export interface ListTreeProps {
  filteredItems: DataNode[];
  disabledKeys: string[];
  disableAll: boolean;
  enabledKeys: string[];
  checkedKeys: string[];
  expandedKeys: string[];
  loadData: (node: EventDataNode) => Promise<void>;
  onItemSelect: (item: ICheckedItem) => void;
  onItemsSelect: (items: ICheckedItem[], checked: boolean) => void;
}

export const ListTree: React.FC<ListTreeProps> = ({
  filteredItems,
  disabledKeys,
  disableAll,
  enabledKeys,
  checkedKeys,
  expandedKeys,
  loadData,
  onItemSelect,
  onItemsSelect
}) => {
  const [internalExpandedKeys, setInternalExpandedKeys] = useState<string[]>(
    expandedKeys
  );
  const treeData = useTreeData(
    filteredItems,
    disableAll,
    disabledKeys,
    enabledKeys,
    checkedKeys,
    onItemsSelect,
    null,
    {
      getLabelProp: node => node.title,
      simpleMode: true
    }
  );

  const handleExpand = expanded => {
    setInternalExpandedKeys(expanded);
  };

  const handleCheck = (_, { node }) => {
    onItemSelect({ key: node.key, title: node.sourceTitle });
  };

  const handleSelect = (_, { node }) => {
    handleCheck(_, { node });
  };

  useEffect(() => {
    setInternalExpandedKeys(expandedKeys);
  }, [expandedKeys]);

  return (
    <Tree
      blockNode
      checkable
      checkStrictly
      expandedKeys={internalExpandedKeys}
      checkedKeys={checkedKeys}
      selectedKeys={[]}
      treeData={treeData}
      loadData={loadData}
      loadedKeys={[]}
      onExpand={handleExpand}
      //@ts-ignore
      onCheck={handleCheck}
      onSelect={handleSelect}
    />
  );
};
