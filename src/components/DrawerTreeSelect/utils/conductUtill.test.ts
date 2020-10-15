import { Children } from "react";
import { conductCheck, isCheckDisabled, isMatched } from "./conductUtil";

jest.mock("rc-tree-select/es/utils/legacyUtil", () => ({
  fillLegacyProps: val => val
}));

const getDataNode = (levels = 1) => {
  if (!levels) {
    return;
  }
  return [
    {
      value: "value",
      title: (a, b) => a === b,
      label: () => {},
      key: "key",
      disabled: false,
      disableCheckbox: false,
      checkable: false,
      children: getDataNode(levels - 1)
    }
  ];
};

const getDataEntity = () => {
  return {
    node: getDataNode(),
    parent: {},
    children: [{}],
    level: 1
  };
};

describe("Conduct utils", () => {
  it("isCheckDisabled util", () => {
    const node = getDataNode();
    expect(isCheckDisabled(node)).toBeFalsy();
  });

  it("isMatched util", () => {
    const node = getDataNode();
    expect(isMatched(node, "val")).toBeFalsy();
  });

  it("fillConductCheck util", () => {
    const keyList = ["key2", "key"];
    const checked = true;
    const unchecked = false;
    const keyEntities = {
      "key": getDataEntity(),
      "key2": getDataEntity()
    };
    const result = conductCheck(keyList, checked, keyEntities as any);
    const uncheckedResult = conductCheck(
      ["key2"],
      {
        checked: unchecked,
        halfCheckedKeys: ["ke"]
      },
      keyEntities as any
    );
    expect(result).toHaveProperty("checkedKeys");
    expect(result).toHaveProperty("halfCheckedKeys");
    expect(Array.isArray(result.halfCheckedKeys)).toBeTruthy();
    expect(Array.isArray(uncheckedResult.halfCheckedKeys)).toBeTruthy();
  });
});
