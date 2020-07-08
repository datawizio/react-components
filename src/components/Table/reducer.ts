import { TableState, Action, SortParams, TableProps } from "./types";
import { basicDTypesConfig } from "./utils/typesConfigs";
import { swapColumns, filterByColumns } from "./utils/utils";

function genColumnsMap(columns) {
  const columnsMap = {};

  (function rec(columns) {
    columns.forEach(column => {
      columnsMap[column.dataIndex] = column;
      column.children && column.children.length && rec(column.children);
    });
  })(columns);

  return columnsMap;
}

export function initializer(props: TableProps): TableState {
  const {
    columns,
    loading,
    dataSource,
    pagination,
    searchValue,
    dTypesConfig,
    showSizeChanger,
    pageSizeOptions,
    visibleColumnsKeys
  } = props;

  return {
    columns,
    loading,
    dataSource,
    searchValue,
    visibleColumnsKeys,

    pagination: {
      showSizeChanger,
      pageSizeOptions,
      pageSize: +pageSizeOptions[0],
      ...(pagination || {})
    },

    sortParams: {},
    filterParams: {},
    expandedRowKeys: [],
    columnsMap: genColumnsMap(columns),
    dTypesConfig: { ...basicDTypesConfig, ...dTypesConfig }
  };
}

export function reducer(state: TableState, action: Action): TableState {
  switch (action.type) {
    case "updateDataSource":
      return {
        ...state,
        expandedRowKeys: [],
        dataSource: action.payload
      };

    case "updateColumns":
      const nextColumnsMap = genColumnsMap(action.payload);
      const nextSortParams = filterByColumns(nextColumnsMap, state.sortParams);
      const nextFilterParams = filterByColumns(
        nextColumnsMap,
        state.filterParams
      );

      const nextVisibleColumnsKeys =
        state.visibleColumnsKeys &&
        state.visibleColumnsKeys.length &&
        state.visibleColumnsKeys.filter(key => nextColumnsMap[key]);

      return {
        ...state,

        columns: action.payload,
        columnsMap: nextColumnsMap,

        sortParams: nextSortParams,
        filterParams: nextFilterParams,

        visibleColumnsKeys: nextVisibleColumnsKeys
      };

    case "visibleColumnsKeys":
      return {
        ...state,
        visibleColumnsKeys: action.payload
      };

    case "paginate":
      return {
        ...state,
        pagination: action.payload
      };

    case "search":
      return {
        ...state,
        searchValue: action.payload,
        pagination: state.pagination && {
          ...state.pagination,
          current: 1
        }
      };

    case "sort":
      const sorters = action.payload;
      const sortParams = sorters
        .filter(({ column }) => column)
        .reduce(
          (acc, { column, order }) => ({
            ...acc,
            [column.dataIndex as string]: order
          }),
          {}
        ) as SortParams;

      return {
        ...state,
        sortParams
      };

    case "filter":
      const filterParams = Object.entries(action.payload).reduce(
        (acc, [key, value]) => {
          if (value) {
            const column = state.columns.find(column => column.key === key);
            if (column && column.dataIndex) acc[column.dataIndex] = value;
          }
          return acc;
        },
        {}
      );

      return {
        ...state,
        filterParams
      };

    case "setRowChildren":
      const [expandedRow, children] = action.payload;
      const nextDataSource = state.dataSource.concat();
      const expandedRowIdx = state.dataSource.findIndex(
        row => row.key === expandedRow.key
      );

      nextDataSource[expandedRowIdx] = {
        ...expandedRow,
        children
      } as any;

      return {
        ...state,
        dataSource: nextDataSource
      };

    case "swapColumns":
      const [keyFrom, keyTo] = action.payload;
      const nextColumns = state.columns.concat();

      swapColumns(nextColumns, keyFrom, keyTo);

      return {
        ...state,
        columns: nextColumns
      };

    case "expandRow":
      return {
        ...state,
        expandedRowKeys: state.expandedRowKeys.concat(action.payload.key)
      };

    case "collapseRow":
      return {
        ...state,
        expandedRowKeys: state.expandedRowKeys.filter(
          key => key !== action.payload.key
        )
      };

    case "loading":
      return {
        ...state,
        loading: action.payload
      };

    case "update":
      let nextState = { ...state, ...action.payload };

      if (action.payload.columns)
        nextState = reducer(nextState, {
          type: "updateColumns",
          payload: nextState.columns
        });

      if (action.payload.dataSource)
        nextState = reducer(nextState, {
          type: "updateDataSource",
          payload: nextState.dataSource
        });

      return nextState;

    default:
      return state;
  }
}
