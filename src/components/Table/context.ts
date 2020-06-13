import React, { Dispatch } from "react";
import { TableProps, TableState } from "./types";

export const TableContext = React.createContext<
  [TableState, Dispatch<Partial<TableState>>, TableProps, TableState]
>(null);

TableContext.displayName = "TableContext";
