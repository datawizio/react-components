import { deepFilter } from "./deepFilter";
import { getStaticDataSource } from "../components/Table/__mocks__";

describe("deep filter", () => {
  const nodes = getStaticDataSource();
  it("deep filter sould return all of element", () => {
    const callback = item => item.hasOwnProperty("key");
    const result = deepFilter(nodes, callback);
    expect(result).toEqual(nodes);
  });
  it("deep filter sould return empty object", () => {
    const converseCallback = item => !item.hasOwnProperty("key");

    const result = deepFilter(nodes, converseCallback);
    expect(result).toEqual([]);
  });

  it("deep filter sould return one node", () => {
    const nodeKey = "0-0";
    const callbackByKey = item => item.key === nodeKey;

    const expectedNode = nodes.filter(node => node.key === nodeKey);
    const result = deepFilter(nodes, callbackByKey);
    expect(result).toEqual(expectedNode);
  });
});
