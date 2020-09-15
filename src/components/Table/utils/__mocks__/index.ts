import { BodyCellType, IColumn } from "../../types";

export const validColumn: IColumn = {
  dtype: "dtype",
  dataIndex: "dataIndex",
  resizable: false
};

export const cell: BodyCellType = {
  dtype: "dtype",
  key: "key"
};

export const invalidColumn: IColumn = {
  dataIndex: "dataIndex",
  resizable: false
};
