import * as React from "react";
import { TableState } from "../Table/types";
import { useReducer, Dispatch } from "react";
import { reducer } from "./reducer";

export const TableContext = React.createContext<
  [TableState, Dispatch<TableState>]
>(null);

export const TableContainer: React.FC = props => {
  const [state, dispatch] = useReducer(reducer, {});
  return (
    <TableContext.Provider value={[state, dispatch]}>
      {props.children}
    </TableContext.Provider>
  );
};

export default TableContainer;
