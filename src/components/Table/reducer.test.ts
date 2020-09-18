import { TablePaginationConfig } from "antd/lib/table";
import { SorterResult } from "antd/lib/table/interface";

import { genColumns, genDataSource } from "../../utils/data/dataGenerators";
import { initializer, reducer } from "./reducer";
import { TableProps } from "./types";
import {
  addLoadingRowAC,
  collapseRowAC,
  dataSource,
  columns as mockColumns,
  expandRowAC,
  filterAC,
  loadingAC,
  paginateAC,
  recoveryStateAC,
  resetPaginationAC,
  searchAC,
  setRowChildrenAC,
  sorthAC,
  swapColumnsAC,
  updateAC,
  updateColumnsAC,
  updateDataSourceAC,
  updateRowAC,
  visibleColumnsKeysAC
} from "./__mocks__";

const getDTypeConfig = () => ({
  sorted: () => true,
  toString: () => "toString",
  search: () => true,
  filter: () => true
});

const pageSizeOptions: Array<string> = ["opt1", "opt2", "opt3"];
const visibleColumnsKeys: Array<string> = ["key1", "key2", "key3"];
const getPagination = (props: Array<string>): false | TablePaginationConfig => {
  return {
    //@ts-ignore
    position: props
  };
};

const columns = genColumns(5, 2);

const decentOrderType = "descend";
export const getSortedResult = (
  countOfItem: number = 5
): SorterResult<any>[] => {
  const columns = genColumns(countOfItem, false);
  return [...Array(countOfItem)].map((_, i) => {
    return {
      column: columns[i],
      order: decentOrderType,
      field: `key_${i}`,
      columnKey: i
    };
  });
};

const initializerProps: TableProps = {
  columns,
  loading: true,
  dataSource: genDataSource(3, columns),
  pagination: getPagination(["topCenter"]),
  searchValue: "searchValue",
  dTypesConfig: getDTypeConfig(),
  showSizeChanger: true,
  pageSizeOptions,
  visibleColumnsKeys: ["key1", "key1", "key2"]
};

describe("Table reducer", () => {
  const initailStore = initializer(initializerProps);
  it("should return updated DataSource", () => {
    const payload = dataSource;
    const store = reducer(initailStore, updateDataSourceAC(payload));
    expect(store.dataSource).toEqual(payload);
    expect(store.expandedRowKeys).toEqual([]);
  });
  it("should return updated columns", () => {
    const payload = mockColumns;
    const store = reducer(initailStore, updateColumnsAC(payload));

    expect(store.columns).toEqual(payload);
  });
  it("should return updated visible columns keys", () => {
    const payload = visibleColumnsKeys;
    const store = reducer(initailStore, visibleColumnsKeysAC(payload));

    expect(store.visibleColumnsKeys).toEqual(payload);
  });
  it("should return updated paginate", () => {
    const payload = getPagination(["topCenter,topRight"]);
    const store = reducer(initailStore, paginateAC(payload));

    expect(store.pagination).toEqual(payload);
  });

  it("should return updated resetPagination", () => {
    const store = reducer(initailStore, resetPaginationAC());
    //@ts-ignore
    expect(store.pagination.current).toEqual(1);
  });

  it("should return updated serch value and pagination", () => {
    const searchVal = "searchVal";
    const store = reducer(initailStore, searchAC(searchVal));
    //@ts-ignore
    expect(store.pagination.current).toEqual(1);
    expect(store.searchValue).toEqual(searchVal);
  });

  it("should updete sortParams ", () => {
    const payload = getSortedResult();
    const store = reducer(initailStore, sorthAC(payload));

    const expectedObj = payload.map(item => item.column.dataIndex);
    const firtsObjKey = Object.keys(store.sortParams)[0];
    expect(Object.keys(store.sortParams)).toEqual(expectedObj);
    expect(store.sortParams[firtsObjKey]).toEqual(decentOrderType);
  });

  it("should add LoadingRow ", () => {
    const payload = "rowID";
    const store = reducer(initailStore, addLoadingRowAC(payload));

    const expectedObj = { ...store.loadingRows, [payload]: true };
    expect(store.loadingRows).toEqual(expectedObj);
  });
});
