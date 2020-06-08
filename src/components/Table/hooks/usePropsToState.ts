import { Dispatch, useEffect } from "react";
import { TableProps, Action } from "../types";

function usePropsToState(dispatch: Dispatch<Action>, props: TableProps) {
  const { visibleColumnsKeys, dataSource, searchValue, columns } = props;

  useEffect(() => {
    dispatch({ type: "update", payload: { searchValue } });
  }, [searchValue, dispatch]);

  useEffect(() => {
    dispatch({ type: "updateColumns", payload: columns || [] });
  }, [columns, dispatch]);

  useEffect(() => {
    dispatch({ type: "updateDataSource", payload: dataSource || [] });
  }, [dataSource, dispatch]);

  useEffect(() => {
    dispatch({ type: "visibleColumnsKeys", payload: visibleColumnsKeys });
  }, [visibleColumnsKeys, columns, dispatch]);
}

usePropsToState.displayName = "usePropsToState";

export default usePropsToState;
