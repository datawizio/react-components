import { TablePaginationConfig } from "antd/lib/table";
import { SorterResult } from "antd/lib/table/interface";

import { genColumns, genDataSource } from "../../utils/data/dataGenerators";
import { initializer, reducer } from "./reducer";
import { Action, TableProps } from "./types";
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
  visibleColumnsKeysAC,
  getDTypeConfig,
  getStaticColumn,
  setNestedTableAC,
  getStaticDataSource,
  columnsPositions,
  pagination
} from "./__mocks__";

const pageSizeOptions: Array<string> = ["5", "10", "15"];
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

const staticColumns = getStaticColumn(3, 2);

const initializerProps: TableProps = {
  columns: staticColumns,
  loading: true,
  dataSource: genDataSource(3, staticColumns),
  pagination: getPagination(["topCenter"]),
  searchValue: "searchValue",
  dTypesConfig: getDTypeConfig(),
  showSizeChanger: true,
  pageSizeOptions,
  visibleColumnsKeys: ["key1", "key2", "key3"]
};

describe("Table reducer", () => {
  let initailStore;
  beforeEach(() => {
    initailStore = initializer(initializerProps);
  });

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

  it("should add loading row ", () => {
    const payload = "rowID";
    const store = reducer(initailStore, addLoadingRowAC(payload));

    const expectedObj = { ...store.loadingRows, [payload]: true };
    expect(store.loadingRows).toEqual(expectedObj);
  });
  it("should set row children ", () => {
    const payload = "rowID";
    const store = reducer(initailStore, addLoadingRowAC(payload));

    const expectedObj = { ...store.loadingRows, [payload]: true };
    expect(store.loadingRows).toEqual(expectedObj);
  });
  it("should swap collumns ", () => {
    const keyFrom = staticColumns[0].key;
    const keyTo = staticColumns[1].key;
    const payload = [keyFrom, keyTo];

    const store = reducer(initailStore, swapColumnsAC(payload));

    expect(store.columns[0].key).toBe(keyTo);
    expect(store.columns[1].key).toBe(keyFrom);
  });

  it("should expand row ", () => {
    const payload = {
      key: "key6"
    };
    const store = reducer(initailStore, expandRowAC(payload));

    expect(store.expandedRowKeys).toContain(payload.key);
  });
  it("should expand row with array payload", () => {
    const payload = {
      key: ["key1"]
    };
    const store = reducer(initailStore, expandRowAC(payload));

    expect(store.expandedRowKeys).toContain(payload.key[0]);
  });
  it("should collapse row ", () => {
    const payload = {
      key: ["key1", "key2", "key3", "key4", "key5"]
    };
    const collapsedRow = {
      key: "key3"
    };
    const store = reducer(initailStore, expandRowAC(payload));
    const nextStore = reducer(store, collapseRowAC(collapsedRow));

    expect(nextStore.expandedRowKeys).not.toContain(collapsedRow.key);
  });
  it("should set loading", () => {
    const payload = false;
    const store = reducer(initailStore, loadingAC(payload));

    expect(store.loading).toBe(payload);
  });
  it("should update state.columns", () => {
    const columns = getStaticColumn(4, 1);
    const payload = {
      columns
    };

    const store = reducer(initailStore, updateAC(payload));

    expect(store.columns).toEqual(columns);
  });
  it("setNestedTable should remove loading row by key", () => {
    const rowPayload = "key1";
    const store = reducer(initailStore, addLoadingRowAC(rowPayload));

    const payload = [
      {
        key: "key1"
      },
      null
    ] as any;
    const nextStore = reducer(store, setNestedTableAC(payload));

    expect(nextStore.loadingRows).not.toHaveProperty(rowPayload, true);
  });

  it("setNestedTable should remove loading row by key", () => {
    const mockDataSource = getStaticDataSource();
    const expandedRow = mockDataSource[0].key;
    const nestedDataSource = mockDataSource[1];
    const nestedKey = "nested";

    const payload = [
      {
        key: expandedRow
      },
      nestedDataSource
    ] as any;

    const store = reducer(initailStore, setNestedTableAC(payload));

    expect(store.dataSource[0]).toHaveProperty(nestedKey);
    expect(store.dataSource[0][nestedKey]).toEqual(nestedDataSource);
  });

  it("should update state.dataSource", () => {
    const columns = getStaticColumn(4, 1);
    const payload = {
      dataSource: genDataSource(2, columns)
    };

    const store = reducer(initailStore, updateAC(payload));

    expect(store.dataSource).toEqual(payload.dataSource);
  });
  it("should return empty filters params", () => {
    const payload = {
      testProps: null,
      props2: null
    };

    const store = reducer(initailStore, filterAC(payload));

    expect(store.filterParams).toMatchObject({});
  });
  it("should set filters params", () => {
    const payload = {
      [staticColumns[0].key]: ["filter1", "filter2"]
    };

    const expectation = {
      [staticColumns[0].dataIndex]: ["filter1", "filter2"]
    };

    const store = reducer(initailStore, filterAC(payload));

    expect(store.filterParams).toEqual(expectation);
  });
  it("should return empty filter params", () => {
    const payload = {
      invalidKey: ["filter1", "filter2"]
    };

    const store = reducer(initailStore, filterAC(payload));

    expect(store.filterParams).toEqual({});
  });
  it("should set row children", () => {
    const children = getStaticDataSource();
    const expandedRowKey = "3-0";

    const store = reducer(initailStore, addLoadingRowAC(expandedRowKey));
    const testChildKey = children[0].key;

    const payload = [
      {
        key: expandedRowKey
      },
      children
    ];

    const nextStore = reducer(initailStore, setRowChildrenAC(payload));

    expect(store.loadingRows).toHaveProperty(expandedRowKey, true);
    expect(nextStore.loadingRows).not.toHaveProperty(expandedRowKey, true);
    expect(nextStore.parentsMap[testChildKey]).toBe(expandedRowKey);
  });

  it("should update row", () => {
    const children = getStaticDataSource();
    const expandedRowKey = "3-0";

    const store = reducer(initailStore, addLoadingRowAC(expandedRowKey));

    const payload = [
      {
        key: expandedRowKey
      },
      children
    ];

    const nextStore = reducer(initailStore, updateRowAC(payload));

    expect(store.loadingRows).toHaveProperty(expandedRowKey, true);
    expect(nextStore.loadingRows).not.toHaveProperty(expandedRowKey, true);
    expect(nextStore.dataSource).toEqual(store.dataSource);
  });

  it("updateRow action  with empty child should remove loading row", () => {
    const expandedRowKey = "3-0";

    const store = reducer(initailStore, addLoadingRowAC(expandedRowKey));

    const payload = [
      {
        key: expandedRowKey
      },
      null
    ];

    const nextStore = reducer(initailStore, updateRowAC(payload));

    expect(store.loadingRows).toHaveProperty(expandedRowKey, true);
    expect(nextStore.loadingRows).not.toHaveProperty(expandedRowKey, true);
  });

  it("update row with empty child should remove loading row", () => {
    const expandPayload = {
      key: ["0-0", "1-0", "2-0", "3-0"]
    };
    const store = reducer(initailStore, expandRowAC(expandPayload));

    const expandedRowKey = "3-0";

    const payload = [
      {
        key: expandedRowKey
      },
      {
        expanded: false
      }
    ];

    const nextStore = reducer(initailStore, updateRowAC(payload));

    expect(store.expandedRowKeys).toContain(expandedRowKey);
    expect(nextStore.expandedRowKeys).not.toContain(expandedRowKey);
  });

  it("should recover State", () => {
    const payload = {
      columnsPositions,
      pagination
    };
    const store = reducer(initailStore, recoveryStateAC(payload));
    expect(store.columns).toEqual(columnsPositions);
    expect(store.pagination["pageSize"]).toBe(pagination.pageSize);
  });

  it("should recover State (with empty payload)", () => {
    const payload = {
      columnsPositions: undefined,
      pagination: undefined
    };
    const store = reducer(initailStore, recoveryStateAC(payload));
    expect(store.stateIsRecovered).toBeTruthy();
  });

  it("should return default store", () => {
    const store = reducer(initailStore, loadingAC(false));
    const nextStore = reducer(store, { type: "invalidType" } as any);

    expect(store).toEqual(nextStore);
  });
});