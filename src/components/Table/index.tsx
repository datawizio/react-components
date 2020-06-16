import clsx from "clsx";
import * as React from "react";
import { Table as AntdTable } from "antd";
import { reducer, initializer } from "./reducer";

import useColumns from "./hooks/useColumns";
import useDataSource from "./hooks/useDataSource";
import usePropsToState from "./hooks/usePropsToState";
import { useMemo, useCallback, useReducer, useEffect } from "react";

import { TableContext } from "./context";

import Column from "./components/Column";
import ToolBar from "./components/ToolBar";
import TableWrapper from "./components/TableWrapper";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import {
  basicSortHandler,
  basicFilterHandler,
  basicSearchHandler
} from "./utils/handlers";

import { TableProps, FCTable } from "./types";

import "./index.less";

const Table: FCTable = props => {
  const {
    style,
    width,
    height,
    children,
    components,
    dataProvider,
    showSizeChanger,
    dataProviderDeps,
    rowChildrenProvider,
    ...restProps
  } = props;

  const [baseState, dispatch] = useReducer(reducer, props, initializer);

  const columnsState = useColumns(baseState, props);

  const dataSourceState = useDataSource(baseState, props);

  const state = {
    ...baseState,
    ...dataSourceState,
    ...columnsState
  };

  usePropsToState(dispatch, props);

  useEffect(() => {
    if (!dataProvider) return;
    (async () => {
      dispatch({ type: "loading", payload: true });
      dispatch({ type: "update", payload: await dataProvider(state) });
      dispatch({ type: "loading", payload: false });
    })();
    // eslint-disable-next-line
  }, [dataProvider].concat(dataProviderDeps && dataProviderDeps(state)));

  const handleChangeTable = useCallback<TableProps["onChange"]>(
    (pagination, filters, sorter) => {
      dispatch({ type: "filter", payload: filters });
      dispatch({ type: "sort", payload: [].concat(sorter) });
      dispatch({ type: "paginate", payload: pagination as any });
    },
    []
  );

  const handleExpandRow = useCallback<TableProps["onExpand"]>(
    async (isExpanded, row) => {
      if (rowChildrenProvider && row.children && !row.children.length) {
        const children = await rowChildrenProvider(row);

        dispatch({
          type: "setRowChildren",
          payload: [row, children.length ? children : undefined]
        });
      }

      dispatch({
        type: isExpanded ? "expandRow" : "collapseRow",
        payload: row
      });
    },
    [rowChildrenProvider]
  );

  const customComponents = useMemo<TableProps["components"]>(
    () => ({
      ...components,
      header: {
        cell: props =>
          Boolean(props.model) ? <Column {...props} /> : <th {...props} />
      },
      table: props => <TableWrapper {...props} style={{ height, width }} />
    }),
    [height, width, components]
  );

  const className = useMemo(
    () =>
      clsx(
        "dw-table",
        {
          "dw-table--loading": state.loading,
          "dw-table--empty": !state.columns.length || !state.dataSource.length
        },
        props.className
      ),
    [
      state.loading,
      props.className,
      state.columns.length,
      state.dataSource.length
    ]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <TableContext.Provider value={[state, dispatch, props, baseState]}>
        {children}
        <AntdTable
          {...(restProps as any)}
          {...state}
          className={className}
          onExpand={handleExpandRow}
          onChange={handleChangeTable}
          components={customComponents}
        />
      </TableContext.Provider>
    </DndProvider>
  );
};

Table.defaultProps = {
  bordered: true,
  sortable: true,
  isResizableColumns: true,

  showSorterTooltip: false,

  className: "",
  size: "small",
  width: "auto",
  height: "auto",
  tableLayout: "fixed",

  dTypesConfig: {},
  columnsConfig: {},
  cellRenderProps: {},

  columns: [],
  dataSource: [],
  pageSizeOptions: ["20", "35", "50", "100"],

  showSizeChanger: true,
  sortHandler: basicSortHandler,
  filterHandler: basicFilterHandler,
  searchHandler: basicSearchHandler
};

Table.ToolBar = ToolBar;

export default Table;
