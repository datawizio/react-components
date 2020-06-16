import React, { Dispatch } from "react";
import { TableProps, TableState, Action } from "./types";

export const TableContext = React.createContext<
  [TableState, Dispatch<Action>, TableProps, TableState]
>(null);

TableContext.displayName = "TableContext";
