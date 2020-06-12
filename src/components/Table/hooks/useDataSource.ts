import { useMemo } from "react";
import { TableProps, TableState } from "../types";

function useDataSource(
  state: TableState,
  props: TableProps
): Partial<TableState> {
  const { sortHandler, filterHandler, searchHandler, async } = props;

  const {
    columnsMap,
    sortParams,
    dataSource,
    searchValue,
    filterParams,
    dTypesConfig
  } = state;

  /* eslint-disable */

  return useMemo(() => {
    let nextState: Partial<TableState> = { dataSource };

    if (async) return nextState;

    const setNextState = newState => {
      if (newState)
        nextState = {
          ...nextState,
          ...newState
        };
    };

    if (searchValue && searchValue.length) {
      const found = searchHandler(
        columnsMap,
        nextState.dataSource,
        searchValue,
        dTypesConfig
      );
      setNextState(found);
    }

    if (Object.keys(filterParams).length) {
      const filtered = filterHandler(
        columnsMap,
        nextState.dataSource,
        filterParams,
        dTypesConfig
      );
      setNextState(filtered);
    }

    if (Object.keys(sortParams).length) {
      const sorted = sortHandler(
        columnsMap,
        nextState.dataSource,
        sortParams,
        dTypesConfig
      );
      setNextState(sorted);
    }

    return nextState;
  }, [
    dataSource,
    columnsMap,
    searchValue,
    JSON.stringify(sortParams),
    JSON.stringify(filterParams)
  ]);

  /* eslint-enable */
}

useDataSource.displayName = "useDataSource";

export default useDataSource;
