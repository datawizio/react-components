import clsx from "clsx";
import * as React from "react";
import { Table as AntdTable } from "antd";
import { reducer, initializer } from "./reducer";

import useColumns from "./hooks/useColumns";
import useDataSource from "./hooks/useDataSource";
import usePropsToState from "./hooks/usePropsToState";

import {
  useMemo,
  useEffect,
  useReducer,
  useContext,
  useCallback,
  useImperativeHandle
} from "react";

import { TableContext } from "./context";
import ConfigContext from "../ConfigProvider/context";

import Loader from "../Loader";
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

import { TableProps, FCTable, TableRef } from "./types";

import "./index.less";

const Table = React.forwardRef<TableRef, TableProps>((props, ref) => {
  const {
    style,
    width,
    height,
    locale,
    children,
    components,
    dataProvider,
    showSizeChanger,
    dataProviderDeps,
    rowChildrenProvider,
    ...restProps
  } = props;

  const { translate } = useContext(ConfigContext);

  const [baseState, dispatch] = useReducer(reducer, props, initializer);

  const columnsState = useColumns(baseState, props);

  const dataSourceState = useDataSource(baseState, props);

  const state = {
    ...baseState,
    ...dataSourceState,
    ...columnsState,
    loading: false
  };

  usePropsToState(dispatch, props);

  const fetchData = useCallback(async () => {
    if (dataProvider) {
      dispatch({ type: "loading", payload: true });
      dispatch({ type: "update", payload: await dataProvider(state) });
      dispatch({ type: "loading", payload: false });
    }
    // eslint-disable-next-line
  }, [dataProvider]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [fetchData].concat(dataProviderDeps && dataProviderDeps(state)));

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

  const totalRenderer = useCallback(
    (total, [current, to]) => {
      return translate(locale.total, { current, to, total });
    },
    [translate]
  );

  const customComponents = useMemo<TableProps["components"]>(
    () => ({
      ...components,
      table: props => <TableWrapper {...props} style={{ height, width }} />,
      header: {
        cell: props =>
          Boolean(props.model) ? <Column {...props} /> : <th {...props} />
      }
    }),
    [height, width, components]
  );

  const className = useMemo(
    () =>
      clsx(
        "dw-table",
        {
          "dw-table--loading": baseState.loading,
          "dw-table--empty": !state.dataSource.length
        },
        props.className
      ),
    [baseState.loading, props.className, state.dataSource.length]
  );

  useImperativeHandle(ref, () => ({
    reload() {
      fetchData();
    }
  }));

  return (
    <DndProvider backend={HTML5Backend}>
      <TableContext.Provider value={[state, dispatch, props, baseState]}>
        <Loader loading={Boolean(baseState.loading)}>
          {children}
          <AntdTable
            {...restProps}
            {...state}
            className={className}
            onExpand={handleExpandRow}
            onChange={handleChangeTable}
            components={customComponents}
            pagination={{
              ...state.pagination,
              ...props.pagination,
              showTotal: totalRenderer
            }}
          />
        </Loader>
      </TableContext.Provider>
    </DndProvider>
  );
}) as FCTable;

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

  locale: {
    total: "TABLE_TOTAL"
  },

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
