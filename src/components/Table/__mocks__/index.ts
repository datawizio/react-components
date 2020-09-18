import { Action, BodyCellType, IColumn, TableState } from "../types";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import { genColumns, genDataSource } from "../../../utils/data/dataGenerators";

const key = Math.random().toString(36).substring(7);

// defineCellType
export const validColumn: IColumn = {
  dtype: "dtype",
  dataIndex: "dataIndex",
  resizable: false
};

export const invalidColumn: IColumn = {
  dataIndex: "dataIndex",
  resizable: false
};

export const cell: BodyCellType = {
  dtype: "dtype",
  key: "key"
};

// filterByColumns
export const columnsMap: TableState["columnsMap"] = {
  col1: {
    dtype: "dtype",
    dataIndex: "1",
    resizable: true
  },
  col2: {
    dtype: "dtype2",
    dataIndex: "2",
    resizable: true
  },
  col3: {
    dtype: "dtype3",
    dataIndex: "3",
    resizable: true
  },
  col4: {
    dtype: "dtype4",
    dataIndex: "4",
    resizable: true
  }
};

export const obj: { [columnKey: string]: any } = {
  col1: {},
  col2: "any",
  col5: "string",
  col6: "number"
};

export const expectedOutput_filterByColumns = {
  col1: {},
  col2: "any"
};

// swapColumns
const generateCollumn = (isValid: boolean = true): IColumn => {
  const column = isValid ? { ...validColumn } : { ...invalidColumn };
  return {
    key,
    children: [
      {
        key,
        ...validColumn
      }
    ],
    ...column
  };
};

export const columnsMock: Array<IColumn> = [
  ...[...new Array(3)].map(() => generateCollumn(true)),
  ...[...new Array(2)].map(() => generateCollumn(false))
];

//Column

export const model = {
  key: "key",
  resizable: false,
  fixed: true,
  title: "title"
};

//Table

const columnsCount = number("columns count", 5);
const dataCount = number("data count", 5);
const treeColumns = boolean("treeColumns", true);
const treeData = boolean("treeData", true);
const toolBar = boolean("toolbar", true);
export const sortable = boolean("sortable", true);

export const columns = genColumns(columnsCount, treeColumns);

export let dataSource = genDataSource(dataCount, columns, ["string"], treeData);

if (columns[0]) {
  columns[0].fixed = "left";
  //
  columns[0].filters = [
    // @ts-ignore
    ...new Set(dataSource.map(item => item[columns[0].dataIndex]))
  ].map(item => ({
    text: item,
    value: item
  }));
}

// Handlers

export const dTypeConfig = {
  boolean: {},
  number: {},
  string: {}
};

// Table reducer

export const updateDataSourceAC = (payload): Action => ({
  type: "updateDataSource",
  payload: payload
});

export const updateColumnsAC = (payload): Action => ({
  type: "updateColumns",
  payload: payload || []
});

export const visibleColumnsKeysAC = (payload): Action => ({
  type: "visibleColumnsKeys",
  payload
});

export const paginateAC = (payload): Action => ({
  type: "paginate",
  payload
});

export const resetPaginationAC = (): Action => ({
  type: "resetPagination"
});

export const searchAC = (payload): Action => ({
  type: "search",
  payload
});

export const sorthAC = (payload): Action => ({
  type: "sort",
  payload: [].concat(payload)
});

export const filterAC = (payload): Action => ({
  type: "filter",
  payload
});

export const addLoadingRowAC = (payload): Action => ({
  type: "addLoadingRow",
  payload
});

export const setRowChildrenAC = (payload): Action => ({
  type: "setRowChildren",
  payload
});

export const swapColumnsAC = (payload): Action => ({
  type: "swapColumns",
  payload
});

export const expandRowAC = (payload): Action => ({
  type: "expandRow",
  payload
});

export const collapseRowAC = (payload): Action => ({
  type: "collapseRow",
  payload
});

export const loadingAC = (payload): Action => ({
  type: "loading",
  payload
});

export const recoveryStateAC = (payload): Action => ({
  type: "recoveryState",
  payload
});

export const updateRowAC = (payload): Action => ({
  type: "updateRow",
  payload
});

export const updateAC = (payload): Action => ({
  type: "update",
  payload
});
