import { Dispatch, useEffect } from "react";
import { TableProps, Action } from "../types";

function usePropsToState(dispatch: Dispatch<Action>, props: TableProps) {
  const {
    columns,
    loading,
    dataSource,
    searchValue,
    visibleColumnsKeys
  } = props;

  useEffect(() => {
    if (loading !== undefined)
      dispatch({ type: "loading", payload: !!loading });
  }, [loading, dispatch]);

  useEffect(() => {
    if (searchValue !== undefined)
      dispatch({ type: "update", payload: { searchValue } });
  }, [searchValue, dispatch]);

  useEffect(() => {
    if (columns.length > 0)
      dispatch({ type: "updateColumns", payload: columns || [] });
  }, [columns, dispatch]);

  useEffect(() => {
    if (dataSource) dispatch({ type: "updateDataSource", payload: dataSource });
  }, [dataSource, dispatch]);

  useEffect(() => {
    if (visibleColumnsKeys)
      dispatch({ type: "visibleColumnsKeys", payload: visibleColumnsKeys });
  }, [visibleColumnsKeys, columns, dispatch]);
}

usePropsToState.displayName = "usePropsToState";

export default usePropsToState;
