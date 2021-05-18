import { TableState } from "../Table/types";

export type TableTemplate = {
  id?: number;
  title: string;
  favorite: boolean;
  state: TableTemplateState;
};

export type TableTemplateState = {
  columnsPositions: Array<LiteColumn>;
} & Partial<TableState>;

export type LiteColumn = {
  dataIndex: string;
  children?: LiteColumn;
  order?: number;
};
