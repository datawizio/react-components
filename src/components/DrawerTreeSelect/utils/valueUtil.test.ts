import {
  isCheckDisabled,
  toArray,
  removeValue,
  addValue,
  flattenOptions,
  getDefaultFilterOption,
  filterOptions
} from "./valueUtil";

jest.mock("rc-tree-select/es/utils/legacyUtil", () => {});

const getDataNode = (levels = 1) => {
  if (!levels) {
    return;
  }
  return [
    {
      value: "value",
      title: () => {},
      label: () => {},
      key: "key",
      disabled: false,
      disableCheckbox: false,
      checkable: false,
      children: getDataNode(levels - 1)
    }
  ];
};

const checkPayload = {
  disabled: true,
  disableCheckbox: true,
  checkable: false
};

describe("Value utils", () => {
  it("toArray util (array)", () => {
    const payload = [1, 3, 5];

    expect(toArray(payload)).toEqual(payload);
  });
  it("toArray util (value)", () => {
    const payload = 1;
    const expectation = [1];

    expect(toArray(payload)).toEqual(expectation);
  });

  it("toArray util (undefined)", () => {
    const payload = undefined;
    const expectation = [];

    expect(toArray(payload)).toEqual(expectation);
  });

  it("isCheckDisabled util (expectation false)", () => {
    expect(isCheckDisabled(checkPayload)).toBeTruthy();
  });

  it("isCheckDisabled util (expectation true)", () => {
    expect(isCheckDisabled(checkPayload)).toBeTruthy();
  });

  it("removeValue util", () => {
    const rawValues = ["str1", 1, 1, 2];
    const valueArr = ["str1", "str2"];
    const value = 1;
    expect(removeValue(rawValues, valueArr as any)).toEqual([1, 2]);
    expect(removeValue(rawValues, value as any)).toEqual(["str1", 2]);
  });

  it("addValue util", () => {
    const rawValues = ["str1", 1, 1, 2];
    const valueArr = ["str1", "str2"];
    const value = 3;
    expect(addValue(rawValues, valueArr as any)).toEqual([
      "str1",
      1,
      2,
      "str2"
    ]);
    expect(addValue(rawValues, value as any)).toEqual(["str1", 1, 2, 3]);
  });

  it("flattenOptions util", () => {
    const payload = getDataNode(2);
    expect(flattenOptions(payload[1])).toEqual([]);
    expect(flattenOptions(getDataNode(0))).toEqual([]);
    expect(flattenOptions(getDataNode(1)[0]["level"])).toEqual([]);
  });

  it("getDefaultFilterOption util", () => {
    const dataNode = {
      props: "Value"
    };
    expect(getDefaultFilterOption("props")("Val", dataNode)).toBeTruthy();
  });
  it("filterOptions util", () => {
    const searchVal = "val";
    const dataNode = getDataNode();
    const optionsBool = {
      optionFilterProp: "str",
      filterOption: false
    };

    expect(filterOptions(searchVal, dataNode, optionsBool)).toEqual(dataNode);
  });
});
