import { AntTreeNodeProps } from "antd/lib/tree";

export function recursiveFilterTreeData(
  value: string,
  treeData: AntTreeNodeProps[],
  condition: (node: AntTreeNodeProps, value: string) => boolean
) {
  let data = [];
  let keys = [];

  function recursiveFilter(value: string, array: AntTreeNodeProps[]) {
    return array.reduce(
      (filtered: AntTreeNodeProps[], node: AntTreeNodeProps) => {
        let children: AntTreeNodeProps[] = [];

        if (node.children) {
          children = recursiveFilter(
            value,
            node.children as AntTreeNodeProps[]
          );
        }

        if (condition(node, value) || children.length > 0) {
          filtered.push({ ...node, children });
          keys.push(node.key);
        }
        return filtered;
      },
      []
    );
  }

  data = recursiveFilter(value, treeData);

  return {
    keys,
    data
  };
}
