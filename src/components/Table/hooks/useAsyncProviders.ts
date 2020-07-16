import { TableState, Action, TableProps } from "./../types";
import { Dispatch, useEffect, useCallback, useRef } from "react";

function useAsyncProviders(
  state: TableState,
  dispatch: Dispatch<Action>,
  props: TableProps
) {
  const { dataProvider, dataProviderDeps, templatesProvider } = props;

  const firstUpdate = useRef(true);

  const fetchData = useCallback(async () => {
    if (dataProvider) {
      dispatch({ type: "update", payload: await dataProvider(state) });
    }
    // eslint-disable-next-line
  }, [dataProvider].concat(dataProviderDeps && dataProviderDeps(state)));

  const recoveryState = useCallback(async () => {
    const templates = await templatesProvider();
    const favorite = templates.find(template => template.favorite);

    dispatch({ type: "update", payload: { templates } });

    favorite
      ? dispatch({ type: "recoveryState", payload: favorite.state })
      : await fetchData();
  }, [dispatch, templatesProvider, fetchData]);

  useEffect(() => {
    (async () => {
      dispatch({ type: "loading", payload: true });
      firstUpdate.current && templatesProvider
        ? await recoveryState()
        : await fetchData();
      dispatch({ type: "loading", payload: false });
    })();
    // eslint-disable-next-line
  }, [
    dispatch,
    fetchData,
    templatesProvider,
    recoveryState,
    state.stateIsRecovered
  ]);

  useEffect(() => {
    firstUpdate.current = false;
  }, []);
}

useAsyncProviders.displayName = "useAsyncProviders";

export default useAsyncProviders;
