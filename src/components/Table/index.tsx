import * as React from "react";
import { Table as AntdTable } from "antd";
import { reducer, initializer } from "./reducer";

import useColumns from "./hooks/useColumns";
import useStateHandlers from "./hooks/useStateHandlers";
import { useMemo, useCallback, useReducer } from "react";

import { TableProps, FCTable } from "./types";
import Column from "./components/Column";
import TableWrapper from "./components/TableWrapper";

import {
  basicSortHandler,
  basicFilterHandler,
  basicSearchHandler
} from "./utils/handlers";

import "./index.less";
import usePropsToState from "./hooks/usePropsToState";
import clsx from "clsx";
import { TableContext } from "./context";
import ToolBar from "./components/ToolBar";

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

  const [state, dispatch] = useReducer(reducer, props, initializer);

  const columnsToRender = useColumns(state, props);

  const updateState = useCallback(nextState => {
    dispatch({ type: "update", payload: nextState });
  }, []);

  usePropsToState(dispatch, props);

  useStateHandlers(updateState, state, props);

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

  const isEmpty = useMemo(() => {
    return !props.columns.length || !props.dataSource.length;
  }, [state.columns.length, state.dataSource]);

  const className = useMemo(
    () => clsx("dw-table", { "dw-table--empty": isEmpty }, props.className),
    [props.className, isEmpty]
  );

  const paginationConfig = {
    ...(props.pagination || {}),
    ...(state.pagination || {}),
    showSizeChanger
  };

  const stateToRender = {
    ...state,
    columns: columnsToRender
  };

  return (
    <TableContext.Provider value={[stateToRender, updateState, props]}>
      {children}
      <AntdTable
        {...(restProps as any)}
        {...stateToRender}
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
