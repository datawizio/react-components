// @ts-nocheck
import {
  basicFilterHandler,
  basicSearchHandler,
  basicSortHandler
} from "./handlers";
import { columns, dataSource, dTypeConfig } from "../__mocks__";

const getHandlerOptions = (param: any): Array<any> => {
  return [columns, dataSource, param, dTypeConfig];
};

const searchResult = () => basicSearchHandler(...getHandlerOptions("str"));
const sortResult = () =>
  basicSortHandler(...getHandlerOptions({ key: "desc" }));
const filterResult = () =>
  basicFilterHandler(...getHandlerOptions({ key: [] }));

describe("Handlers", () => {
  it("basicSearchHandler return valid response", () => {
    expect(searchResult()).toHaveProperty("dataSource");
  });

  it("basicSearchHandler return array", () => {
    const result = searchResult();
    expect(Array.isArray(result.dataSource)).toBeTruthy();
  });

  it("basicFilterHandler return valid response", () => {
    expect(sortResult()).toHaveProperty("dataSource");
  });

  it("basicFilterHandler return array", () => {
    const result = sortResult();
    expect(Array.isArray(result.dataSource)).toBeTruthy();
  });

  it("basicFilterHandler return valid response", () => {
    expect(filterResult()).toHaveProperty("dataSource");
  });

  it("basicFilterHandler return array", () => {
    const result = filterResult();
    expect(Array.isArray(result.dataSource)).toBeTruthy();
  });
});
