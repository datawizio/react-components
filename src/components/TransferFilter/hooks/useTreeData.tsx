import * as React from "react";
import { ButtonAddAll } from "../List/ButtonAddAll";
import {
  DataNode,
  InnerDataNode,
  SimpleModeConfig,
  RawValueType
} from "rc-tree-select/es/interface";
import { convertChildrenToData } from "rc-tree-select/es/utils/legacyUtil";

import { ICheckedItem } from "../types";

const MAX_WARNING_TIMES = 10;

function parseSimpleTreeData(
  treeData: DataNode[],
  disableAll: boolean,
  disabledSet: Set<string>,
  enabledSet: Set<string>,
  selectedSet: Set<string>,
  onItemsSelect: (items: ICheckedItem[], checked: boolean) => void,
  { id, pId, rootPId }: SimpleModeConfig
): DataNode[] {
  const keyNodes = {};
  const rootNodeList = [];
  // Fill in the map
  const nodeList = treeData.map(node => {
    const clone = { ...node };
    const key = clone[id];
    keyNodes[key] = clone;
    clone.key = clone.key || key;
    clone.disabled = disableAll ? !enabledSet.has(key) : disabledSet.has(key);
    clone.sourceTitle = clone.title;
    clone.title = (
      <>
        {clone.title}
        <ButtonAddAll
          node={keyNodes[key]}
          selected={selectedSet}
          onClick={onItemsSelect}
        />
      </>
    );
    return clone;
  });

  // Connect tree
  nodeList.forEach(node => {
    const parentKey = node[pId];
    const parent = keyNodes[parentKey];

    // Fill parent
    if (parent) {
      parent.children = parent.children || [];
      parent.children.push(node);
    }

    // Fill root tree node
    if (parentKey === rootPId || (!parent && rootPId === null)) {
      rootNodeList.push(node);
    }
  });

  // nodeList.forEach(item => {
  //   const key = item[id];
  //   const node = keyNodes[key];
  //   node.title = (
  //     <>
  //       {node.title}
  //       <ButtonAddAll node={node} />
  //     </>
  //   );
  // });

  return rootNodeList;
}

/**
 * Format `treeData` with `value` & `key` which is used for calculation
 */
function formatTreeData(
  treeData: DataNode[],
  getLabelProp: (node: DataNode) => React.ReactNode
): InnerDataNode[] {
  let warningTimes = 0;
  const valueSet = new Set<RawValueType>();

  function dig(dataNodes: DataNode[]) {
    return (dataNodes || []).map(node => {
      const { key, value, children, ...rest } = node;

      const mergedValue = "value" in node ? value : key;

      const dataNode: InnerDataNode = {
        ...rest,
        key: key !== null && key !== undefined ? key : mergedValue,
        value: mergedValue,
        title: getLabelProp(node)
      };

      // Check `key` & `value` and warning user
      if (process.env.NODE_ENV !== "production") {
        if (
          key !== null &&
          key !== undefined &&
          value !== undefined &&
          String(key) !== String(value) &&
          warningTimes < MAX_WARNING_TIMES
        ) {
          warningTimes += 1;
          // warning(
          //   false,
          //   `\`key\` or \`value\` with TreeNode must be the same or you can remove one of them. key: ${key}, value: ${value}.`
          // );
        }

        // warning(
        //   !valueSet.has(value),
        //   `Same \`value\` exist in the tree: ${value}`
        // );
        valueSet.add(value);
      }

      if ("children" in node) {
        dataNode.children = dig(children);
      }

      return dataNode;
    });
  }

  return dig(treeData);
}

/**
 * Convert `treeData` or `children` into formatted `treeData`.
 * Will not re-calculate if `treeData` or `children` not change.
 */
export default function useTreeData(
  treeData: DataNode[],
  disableAll: boolean,
  disabled: string[],
  enabled: string[],
  selected: string[],
  onItemsSelect: (items: ICheckedItem[], checked: boolean) => void,
  children: React.ReactNode,
  {
    getLabelProp,
    simpleMode
  }: {
    getLabelProp: (node: DataNode) => React.ReactNode;
    simpleMode: boolean | SimpleModeConfig;
  }
): InnerDataNode[] {
  const cacheRef = React.useRef<{
    treeData?: DataNode[];
    children?: React.ReactNode;
    formatTreeData?: InnerDataNode[];
    disableAll?: boolean;
    disabled?: string[];
    selected?: number;
    enabled?: string[];
  }>({});

  if (treeData) {
    cacheRef.current.formatTreeData =
      cacheRef.current.treeData === treeData &&
      cacheRef.current.disableAll === disableAll &&
      cacheRef.current.disabled === disabled &&
      cacheRef.current.selected === selected.length &&
      cacheRef.current.enabled === enabled
        ? cacheRef.current.formatTreeData
        : formatTreeData(
            simpleMode
              ? parseSimpleTreeData(
                  treeData,
                  disableAll,
                  new Set(disabled),
                  new Set(enabled),
                  new Set(selected),
                  onItemsSelect,
                  {
                    id: "id",
                    pId: "pId",
                    rootPId: null,
                    ...(simpleMode !== true ? simpleMode : {})
                  }
                )
              : treeData,
            getLabelProp
          );

    cacheRef.current.treeData = treeData;
    cacheRef.current.disableAll = disableAll;
    cacheRef.current.disabled = disabled;
    cacheRef.current.enabled = enabled;
    cacheRef.current.selected = selected.length;
  } else {
    cacheRef.current.formatTreeData =
      cacheRef.current.children === children
        ? cacheRef.current.formatTreeData
        : formatTreeData(convertChildrenToData(children), getLabelProp);
  }

  return cacheRef.current.formatTreeData;
}
