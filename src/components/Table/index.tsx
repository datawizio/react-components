import clsx from "clsx";
import * as React from "react";
import { Table as AntdTable } from "antd";
import { reducer, initializer } from "./reducer";

import useColumns from "./hooks/useColumns";
import useDataSource from "./hooks/useDataSource";
import usePropsToState from "./hooks/usePropsToState";

import {
  useMemo,
  useReducer,
  useContext,
  useCallback,
  useImperativeHandle
} from "react";

import { TableContext } from "./context";
import ConfigContext from "../ConfigProvider/context";

import Cell from "./components/Cell";
import Column from "./components/Column";
import ToolBar from "./components/ToolBar";
import TableWrapper from "./components/TableWrapper";
import {
  LoadingOutlined,
  RightOutlined,
  DownOutlined
} from "@ant-design/icons";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import {
  basicSortHandler,
  basicFilterHandler,
  basicSearchHandler
} from "./utils/handlers";

import { TableProps, FCTable, TableRef } from "./types";

import "./index.less";
import useAsyncProviders from "./hooks/useAsyncProviders";
import { isSafari } from "../../utils/navigatorInfo";
import Row from "./components/Row";
import { HeaderWrapper } from "./components/HeaderWrapper";
import { useVT } from "./components/VirtualList";
import { SkeletonTable } from "./components/SkeletonTable";

export class CancelRequestError extends Error {
  data: any;
  constructor(data: any) {
    super("Canceled Request"); // (1)
    this.name = "CancelRequestError"; // (2)
    this.data = data;
  }
}

const Table = React.forwardRef<TableRef, TableProps>((props, ref) => {
  const {
    errorRender,
    vid,
    virtual,
    virtualDebug,
    style,
    width,
    height,
    locale,
    isNested,
    children,
    components,
    autoColWidth,
    dataProvider,
    showExpandIcon,
    compressColumns,
    showSizeChanger,
    dataProviderDeps,
    templatesProvider,
    responsiveColumns,
    rowChildrenProvider,
    nestedTableProvider,
    onColumnWidthChange,
    expandRowCallback,
    sortColumnCallback,
    isTotalRow,
    calcColumnWidth,
    ...restProps
  } = props;

  const isAsync = props.async;

  const { translate } = useContext(ConfigContext);

  const [baseState, dispatch] = useReducer(reducer, props, initializer);

  const columnsState = useColumns(baseState, props);

  const dataSourceState = useDataSource(baseState, props);

  const state: any = {
    ...baseState,
    ...dataSourceState,
    ...columnsState,
    loading: false
  };

  if (!isAsync) {
    if (state.pagination.total !== state.dataSource.length) {
      state.pagination.total = state.dataSource.length;
      dispatch({ type: "paginate", payload: state.pagination });
    }
  }

  if (dataSourceState.expandedRowKeys) delete dataSourceState.expandedRowKeys;

  const fetchData = useAsyncProviders(state, dispatch, props);

  usePropsToState(dispatch, props);

  const handleChangeTable = useCallback<TableProps["onChange"]>(
    (pagination, filters, sorter, { currentDataSource, action }) => {
      dispatch({ type: "filter", payload: filters });
      dispatch({ type: "sort", payload: [].concat(sorter) });
      dispatch({ type: "paginate", payload: pagination as any });
      if (action === "sort" && sortColumnCallback) {
        sortColumnCallback(sorter);
      }
    },
    [sortColumnCallback]
  );

  const handleExpandRow = useCallback<TableProps["onExpand"]>(
    async (isExpanded, row) => {
      let toggle = true;
      if ((isNested && isNested(row)) || (!isNested && nestedTableProvider)) {
        if (!row.nested) {
          dispatch({
            type: "addLoadingRow",
            payload: row.key
          });
          const result = await nestedTableProvider(row);
          if (!result) toggle = false;
          dispatch({
            type: "setNestedTable",
            payload: [row, result]
          });
        }
      } else if (rowChildrenProvider && row.children && !row.children.length) {
        dispatch({
          type: "addLoadingRow",
          payload: row.key
        });
        const children = await rowChildrenProvider(row, state);
        dispatch({
          type: "setRowChildren",
          payload: [row, children.length ? children : undefined]
        });
      }

      toggle &&
        dispatch({
          type: isExpanded ? "expandRow" : "collapseRow",
          payload: row
        });

      if (isExpanded) {
        expandRowCallback && expandRowCallback(row);
      }
    },
    [
      rowChildrenProvider,
      nestedTableProvider,
      isNested,
      state,
      expandRowCallback
    ]
  );

  const totalRenderer = useCallback(
    (total, [current, to]) => {
      return translate(locale.total, { current, to, total });
    },
    [translate, locale.total]
  );

  const expandIconRender = useCallback(
    ({ expanded, onExpand, record, prefixCls, expandable }) => {
      const iconPrefix = `${prefixCls}-row-expand-icon`;
      if (state.loadingRows[record.key]) return <LoadingOutlined />;
      let icon = null;
      let internalExpandable = expandable;
      if (showExpandIcon) {
        internalExpandable = showExpandIcon(record);
      }
      if (internalExpandable) {
        icon = <RightOutlined />;
        if (expanded) {
          icon = <DownOutlined />;
        }
      }

      return (
        <button
          type="button"
          onClick={e => {
            onExpand(record, e!);
            e.stopPropagation();
          }}
          className={clsx(iconPrefix, {
            [`${iconPrefix}-spaced`]: !internalExpandable,
            [`${iconPrefix}-expanded`]: expandable && expanded,
            [`${iconPrefix}-collapsed`]: expandable && !expanded
          })}
          aria-label={expanded ? locale.collapse : locale.expand}
        >
          {icon}
        </button>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.loadingRows]
  );

  const [vt] = useVT(
    () => ({
      id: vid,
      scroll: {
        y: height
      },
      overscanRowCount: 1,
      debug: virtualDebug
    }),
    [height, vid]
  );

  const customComponents = useMemo<TableProps["components"]>(() => {
    if (virtual) {
      return {
        header: {
          wrapper: HeaderWrapper,
          cell: props => {
            return Boolean(props.model) ? (
              <Column
                {...props}
                calcColumnWidth={calcColumnWidth}
                virtual={virtual}
                isHeader
                onWidthChange={onColumnWidthChange ?? (() => {})}
              />
            ) : (
              <th {...props} />
            );
          }
        },
        ...vt
        // ...VList({
        //   height: height, // (required).  same value for scrollY
        //   vid: vid
        // })
      };
    }
    return {
      ...components,
      table: props => <TableWrapper {...props} style={{ height, width }} />,
      header: {
        cell: props => {
          return Boolean(props.model) ? (
            <Column
              calcColumnWidth={calcColumnWidth}
              isHeader
              {...props}
              onWidthChange={onColumnWidthChange}
            />
          ) : (
            <th {...props} />
          );
        }
      },
      body: {
        cell: props => <Cell {...props} />,
        row: props => <Row {...props} isTotalRow={isTotalRow} />
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [virtual, components, vt, height, width, isTotalRow]);

  const className = useMemo(
    () =>
      clsx(
        "dw-table",
        {
          "dw-table--skeleton":
            baseState.firstRenderLoader && props.dataProvider,
          "dw-table--loading": baseState.loading,
          "dw-table--empty": !state.dataSource.length,
          "dw-table--nestedable": props.expandable?.expandedRowRender,
          "dw-table--responsive-columns": responsiveColumns,
          "dw-table--auto-col-width": autoColWidth,
          "dw-table--compress-columns": compressColumns,
          "dw-table--safari": isSafari(),
          "dw-table--virtual": virtual,
          "dw-table--small":
            (typeof height === "string" ? parseInt(height) : height) < 200
        },
        props.className
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      baseState.loading,
      state.dataSource.length,
      props.expandable,
      props.className,
      responsiveColumns,
      autoColWidth,
      compressColumns
    ]
  );

  useImperativeHandle(ref, () => ({
    async load(payload: boolean = true) {
      dispatch({ type: "loading", payload });
    },
    async reload() {
      dispatch({ type: "loading", payload: true });
      await fetchData();
      dispatch({ type: "loading", payload: false });
    },
    updateRow(rowKey: string, data: any) {
      dispatch({ type: "updateRow", payload: [rowKey, data] });
    },
    getState() {
      return state;
    },
    addLoadingRow(rowKey: string) {
      dispatch({ type: "addLoadingRow", payload: rowKey });
    },
    resetPagination(pageSize?: number) {
      dispatch({ type: "resetPagination", payload: pageSize });
    },
    expandRow(isExpanded, row) {
      handleExpandRow(isExpanded, row);
    }
  }));

  return (
    <div className="dw-table-container">
      <DndProvider backend={HTML5Backend}>
        <TableContext.Provider
          value={{
            tableProps: props,
            tableState: state,
            dispatch: dispatch,
            baseTableState: baseState
          }}
        >
          <SkeletonTable
            loading={Boolean(baseState.loading)}
            skeleton={Boolean(
              baseState.firstRenderLoader && props.dataProvider
            )}
          >
            {children}
            {state.error && errorRender ? (
              errorRender(state.error)
            ) : (
              <AntdTable
                {...restProps}
                {...state}
                scroll={
                  virtual
                    ? {
                        y: height,
                        x: 500
                      }
                    : undefined
                }
                expandIcon={expandIconRender}
                className={className}
                onExpand={handleExpandRow}
                onChange={handleChangeTable}
                components={customComponents}
                pagination={
                  props.pagination === false
                    ? false
                    : {
                        ...state.pagination,
                        ...props.pagination,
                        showTotal: totalRenderer
                      }
                }
              />
            )}
          </SkeletonTable>
        </TableContext.Provider>
      </DndProvider>
    </div>
  );
}) as FCTable;

Table.defaultProps = {
  bordered: true,
  sortable: true,
  isResizableColumns: true,
  autoColWidth: false,
  compressColumns: false,

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
