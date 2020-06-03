import { TableProps, TableState, HandlerResponse } from "../types";
import { useMemo, DependencyList, useEffect } from "react";

function useStateHandlers(
  onProcessedState: (nextState: HandlerResponse) => void,
  state: TableState,
  props: TableProps
) {
  const { sortHandler, filterHandler, searchHandler, globalHandler } = props;

  const {
    pagination,
    sortParams,
    searchValue,
    dTypesConfig,
    filterParams,
    baseDataSource
  } = state;

  /* eslint-disable */

  useEffect(() => {
    (async () => {
      if (globalHandler) {
        const handlerResponse = await globalHandler(state);
        handlerResponse && onProcessedState(handlerResponse);
      }
    })();
  }, [
    searchValue,
    JSON.stringify(pagination),
    JSON.stringify(sortParams),
    JSON.stringify(filterParams)
  ]);

  /* eslint-enable */

  // HANDLING DATA SOURCE

  const found = useDataHandler(
    dataSource => searchHandler(dataSource, searchValue, dTypesConfig),
    [searchValue, dTypesConfig],
    { dataSource: baseDataSource },
    Boolean(searchValue && !globalHandler)
  );

  const filtered = useDataHandler(
    dataSource => filterHandler(dataSource, filterParams, dTypesConfig),
    [dTypesConfig, JSON.stringify(filterParams)],
    found,
    Boolean(Object.keys(filterParams).length && !globalHandler)
  );

  const sorted = useDataHandler(
    dataSource => sortHandler(dataSource, sortParams, dTypesConfig),
    [dTypesConfig, JSON.stringify(sortParams)],
    filtered,
    Boolean(Object.keys(sortParams).length && !globalHandler)
  );

  // On some handler changed state
  useEffect(() => {
    !globalHandler &&
      onProcessedState({
        ...found,
        ...filtered,
        ...sorted
      });
  }, [globalHandler, onProcessedState, found, filtered, sorted]);
}

function useDataHandler(
  handler: (dataSource?: TableProps["dataSource"]) => HandlerResponse,
  deps: DependencyList,
  prevHandlerResponse?: HandlerResponse,
  runCondition: boolean = true
) {
  const { dataSource } = prevHandlerResponse || {};

  return useMemo(() => {
    const handlerResponse = dataSource && runCondition && handler(dataSource);
    return handlerResponse || prevHandlerResponse;
    // eslint-disable-next-line
  }, [...deps, dataSource, runCondition]);
}

useDataHandler.displayName = "useDataHandler";
useStateHandlers.displayName = "useStateHandlers";

export default useStateHandlers;
