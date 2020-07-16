import React, { Dispatch } from "react";
import { TableProps, TableState, Action } from "./types";

export const TableContext = React.createContext<{
  tableState: TableState;
  tableProps: TableProps;
  baseTableState: TableState;
  dispatch: Dispatch<Action>;
}>(null);

TableContext.displayName = "TableContext";
