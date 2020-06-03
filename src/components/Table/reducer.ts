import { TableState, Action, SortParams, TableProps } from "./types";
import { basicDTypesConfig } from "./utils/typesConfigs";

export function initializer(props: TableProps): TableState {
  const {
    columns,
    dataSource,
    searchValue,
    dTypesConfig,
    visibleColumnsKeys
  } = props;

  return {
    columns,
    dataSource,
    searchValue,
    visibleColumnsKeys,

    sortParams: {},
    filterParams: {},
    expandedRowKeys: [],
    baseDataSource: dataSource,
    dTypesConfig: { ...basicDTypesConfig, ...dTypesConfig }
  };
}

export function reducer(state: TableState, action: Action): TableState {
  switch (action.type) {
    case "updateDataSource":
      return {
        ...state,
        baseDataSource: action.payload
      };

    case "updateColumns":
      return {
        ...state,
        columns: action.payload
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
        searchValue: action.payload
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
      const nextDataSource = state.baseDataSource.concat();
      const expandedRowIdx = state.baseDataSource.findIndex(
        row => row.key === expandedRow.key
      );

      nextDataSource[expandedRowIdx] = {
        ...expandedRow,
        children
      } as any;

      return {
        ...state,
        baseDataSource: nextDataSource
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

    case "handlerResponded":
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
}
