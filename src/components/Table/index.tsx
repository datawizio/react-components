import clsx from "clsx";
import * as React from "react";
import { Table as AntdTable } from "antd";
import { reducer, initializer } from "./reducer";

import useColumns from "./hooks/useColumns";
import useDataSource from "./hooks/useDataSource";
import usePropsToState from "./hooks/usePropsToState";
import { useMemo, useCallback, useReducer } from "react";

import { TableContext } from "./context";
import Column from "./components/Column";
import ToolBar from "./components/ToolBar";
import TableWrapper from "./components/TableWrapper";

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
    globalHandler,
    showSizeChanger,
    rowChildrenProvider,
    ...restProps
  } = props;

  const [_state, dispatch] = useReducer(reducer, props, initializer);

  const columnsState = useColumns(_state, props);

  const dataSourceState = useDataSource(_state, props);

  const state = {
    ..._state,
    ...dataSourceState,
    ...columnsState
  };

  const updateState = useCallback(nextState => {
    dispatch({ type: "update", payload: nextState });
  }, []);

  usePropsToState(dispatch, props);

  // useStateHandlers(updateState, state, props);

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
          "dw-table--loading": props.loading || state.loading,
          "dw-table--empty": !state.columns.length || !state.dataSource.length
        },
        props.className
      ),
    [
      state.loading,
      props.loading,
      props.className,
      state.columns.length,
      state.dataSource.length
    ]
  );

  const paginationConfig = useMemo(
    () => ({
      ...(props.pagination || {}),
      ...(state.pagination || {}),
      showSizeChanger
    }),
    [props.pagination, state.pagination, showSizeChanger]
  );

  return (
    <TableContext.Provider value={[state, updateState, props]}>
      {children}
      <AntdTable
        {...(restProps as any)}
        {...state}
        className={className}
        onExpand={handleExpandRow}
        onChange={handleChangeTable}
        pagination={paginationConfig}
        components={customComponents}
      />
    </TableContext.Provider>
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
  tableLayout: "auto",

  dTypesConfig: {},
  columnsConfig: {},
  cellRenderProps: {},

  columns: [],
  dataSource: [],

  showSizeChanger: true,
  sortHandler: basicSortHandler,
  filterHandler: basicFilterHandler,
  searchHandler: basicSearchHandler
};

Table.ToolBar = ToolBar;

export default Table;
