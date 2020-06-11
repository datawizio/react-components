import { TableState, Action, SortParams, TableProps } from "./types";
import { basicDTypesConfig } from "./utils/typesConfigs";

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
      return {
        ...state,
        sortParams: {},
        filterParams: {},
        columns: action.payload,
        columnsMap: genColumnsMap(action.payload)
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

    case "update":
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
}
