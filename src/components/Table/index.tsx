import * as React from "react";
import { Table as AntdTable } from "antd";
import { reducer, initializer } from "./reducer";

import useColumns from "./hooks/useColumns";
import useStateHandlers from "./hooks/useStateHandlers";
import { useMemo, useCallback, useReducer } from "react";

import { TableProps } from "./types";
import Column from "./components/Column";
import TableWrapper from "./components/TableWrapper";
import TableControlPanel from "../TableControlPanel";

import {
  basicSortHandler,
  basicFilterHandler,
  basicSearchHandler,
  exportTableToXLSX
} from "./utils/handlers";

import "./index.less";
import usePropsToState from "./hooks/usePropsToState";
import clsx from "clsx";

const Table: React.FC<TableProps> = props => {
  const {
    style,
    width,
    height,
    components,
    rowChildrenProvider,
    ...restProps
  } = props;

  const [state, dispatch] = useReducer(reducer, props as any, initializer);

  const visibleColumns = useColumns(state, props);

  const onHandlersResponded = useCallback(nextState => {
    dispatch({ type: "handlerResponded", payload: nextState });
  }, []);

  usePropsToState(dispatch, props);

  useStateHandlers(onHandlersResponded, state, props);

  const onSelectColumn = useCallback(nextVisibleColumns => {
    dispatch({ type: "visibleColumnsKeys", payload: nextVisibleColumns });
  }, []);

  const handleSearch = useCallback(nextSearchValue => {
    dispatch({ type: "search", payload: nextSearchValue });
  }, []);

  const handleExport = useCallback(() => {
    exportTableToXLSX(visibleColumns, state.dataSource);
  }, [visibleColumns, state.dataSource]);

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
    return !visibleColumns.length || !state.dataSource;
  }, [visibleColumns.length, state.dataSource]);

  const className = useMemo(
    () => clsx("dw-table", { "dw-table--empty": isEmpty }, props.className),
    [props.className, isEmpty]
  );

  return (
    <>
      <TableControlPanel
        onExport={handleExport}
        onSearch={handleSearch}
        columns={props.columns || []}
        onSelectColumns={onSelectColumn}
        visibleColumnsKeys={visibleColumns.map(column => column.key)}
      />
      <AntdTable
        {...(restProps as any)}
        {...state}
        className={className}
        columns={visibleColumns}
        onExpand={handleExpandRow}
        onChange={handleChangeTable}
        components={customComponents}
      />
    </>
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

  sortHandler: basicSortHandler,
  filterHandler: basicFilterHandler,
  searchHandler: basicSearchHandler
};

export default Table;
