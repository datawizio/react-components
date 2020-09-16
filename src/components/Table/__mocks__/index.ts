import { BodyCellType, IColumn, TableState } from "../types";

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

export const columns: Array<IColumn> = [
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
