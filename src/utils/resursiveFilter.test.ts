import { recursiveFilterTreeData } from "./resursiveFilter";
import { AntTreeNodeProps } from "antd/lib/tree";

const mockTreeData = [
  {
    children: [
      {
        children: [],
        eventKey: "value",
        key: "mockKey1"
      }
    ],
    eventKey: "value",
    key: "mockKey2"
  }
];

const mockArg = {
  value: "val",
  treeData: mockTreeData as AntTreeNodeProps[],
  condition: (node: AntTreeNodeProps, value: string) =>
    node.eventKey.includes(value)
};

describe("recursiveFilterTreeData", () => {
  it("recursiveFilterTreeData works correctly", () => {
    const result = recursiveFilterTreeData(
      mockArg.value,
      mockArg.treeData,
      mockArg.condition
    );
    const expected = {
      data: mockTreeData,
      keys: [mockTreeData[0].children[0].key, mockTreeData[0].key]
    };
    expect(result).toEqual(expected);
  });
  it("recursiveFilterTreeData works correctly return empty", () => {
    const result = recursiveFilterTreeData(
      mockArg.value,
      mockArg.treeData,
      () => false
    );

    const expected = { "data": [], "keys": [] };
    expect(result).toEqual(expected);
  });
});
