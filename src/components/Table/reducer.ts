import {
  TableState,
  Action,
  SortParams,
  TableProps,
  IRow,
  IColumn
} from "./types";
import { basicDTypesConfig } from "./utils/typesConfigs";
import {
  swapColumns,
  filterByColumns,
  reindexColumns,
  setMultisortingForColumns
} from "./utils/utils";
import { isEqual } from "lodash";

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

function findExpandedRecord(
  path: string[],
  children: IRow[],
  changeParentData?: (record: any) => any
) {
  const next = path.pop();
  let record = children.find(child => child.key === next);
  if (!record) return { children: [] };
  if (path.length) {
    if (changeParentData) {
      changeParentData(record);
    }
    return findExpandedRecord(path, record.children, changeParentData);
  }

  return record;
}

function getRecordPath(rowKey: any, parentsMap: any) {
  const path = [];

  const buildPath = (key: string) => {
    path.push(key);
    if (!parentsMap[key]) return;
    buildPath(parentsMap[key]);
  };

  buildPath(rowKey);

  return path;
}

export function initializer(props: TableProps): TableState {
  const {
    error,
    columns,
    loading,
    dataSource,
    pagination,
    searchValue,
    sortParams,
    forceColumns,
    dTypesConfig,
    showSizeChanger,
    pageSizeOptions,
    visibleColumnsKeys,
    multisorting,
    columnsSorter
  } = props;

  return {
    error,
    columns,
    loading,
    dataSource,
    searchValue,

    forceColumns,
    columnsSorter,
    multisorting,

    pagination: {
      showSizeChanger,
      pageSizeOptions,
      pageSize: +pageSizeOptions[0],
      ...(pagination || {})
    },

    sortParams: sortParams ?? {},
    filterParams: {},
    expandedRowKeys: [],
    columnsMap: genColumnsMap(columns),
    columnsWidth: {},
    fixedTotal: true,
    parentsMap: {},
    visibleColumnsKeys: visibleColumnsKeys || [],
    dTypesConfig: { ...basicDTypesConfig, ...dTypesConfig },
    loadingRows: {},
    columnsSwapped: false,
    forceFetch: 1,
    columnsForceUpdate: 1,
    firstRenderLoader: true
  };
}

export function reducer(state: TableState, action: Action): TableState {
  switch (action.type) {
    case "updateDataSource": {
      return {
        ...state,
        expandedRowKeys: [],
        parentsMap: {},
        dataSource: action.payload
      };
    }
    case "columnWidthChange":
      if (state.columnsWidth[action.payload.key] === action.payload.width) {
        return state;
      }
      return {
        ...state,
        columnsWidth: {
          ...state.columnsWidth,
          [action.payload.key]: action.payload.width
        }
      };
    case "updateColumns": {
      let cols = action.payload as IColumn[];
      let cancelled = false;
      let oldColumns = [];
      let visibleColumnsKeys = state.visibleColumnsKeys;

      if (!Array.isArray(action.payload)) {
        cols = action.payload.columns;
        cancelled = Boolean(action.payload.cancelled);
        oldColumns = state.visibleColumnsKeys;
        visibleColumnsKeys =
          action.payload.visibleColumnsKeys ?? state.visibleColumnsKeys;
      }

      const nextColumnsMap = genColumnsMap(cols);
      const nextSortParams = filterByColumns(nextColumnsMap, state.sortParams);
      const nextFilterParams = filterByColumns(
        nextColumnsMap,
        state.filterParams
      );

      const nextVisibleColumnsKeys =
        visibleColumnsKeys?.length &&
        visibleColumnsKeys.filter(key => nextColumnsMap[key]);

      const nextColumns = (function rec(newColumns, oldColumns) {
        if (state.forceColumns) {
          return newColumns;
        }

        const oldColumnsInfo: any = {};
        oldColumns.forEach((column, index) => {
          oldColumnsInfo[column.dataIndex] = {
            index,
            order: column.order
          };
        });

        if (state.columnsSorter) {
          const isFavorite = !!state.templates?.find(t => t.favorite);
          state.columnsSorter(
            newColumns,
            oldColumnsInfo,
            state.columnsSwapped,
            state.templateSelected || isFavorite
          );
        } else {
          newColumns.sort((a, b) => {
            const aIndex = oldColumnsInfo[a.dataIndex]
              ? oldColumnsInfo[a.dataIndex].index
              : 0;
            const bIndex = oldColumnsInfo[b.dataIndex]
              ? oldColumnsInfo[b.dataIndex].index
              : 0;
            return aIndex - bIndex;
          });
        }

        newColumns.forEach(column => {
          const oldColumn = oldColumnsInfo[column.dataIndex];
          if (column.children?.length && oldColumn?.children?.length) {
            rec(column.children, oldColumn.children);
          }
          if (oldColumn?.order) {
            column.order = oldColumn.order;
          }
        });

        return newColumns;
      })(cols, state.columns);

      return {
        ...state,
        cancelled,
        oldColumns,
        columns: nextColumns,
        columnsMap: nextColumnsMap,

        sortParams: nextSortParams,
        filterParams: nextFilterParams,

        visibleColumnsKeys: nextVisibleColumnsKeys || []
      };
    }
    case "visibleColumnsKeys": {
      return {
        ...state,
        visibleColumnsKeys: action.payload
      };
    }
    case "paginate": {
      return {
        ...state,
        pagination: {
          ...action.payload,
          current: (action.payload && action.payload.current) || 1
        }
      };
    }
    case "resetPagination": {
      const newState: any = {
        current: 1
      };
      if (action.payload) {
        newState.pageSize = action.payload;
      }
      return {
        ...state,
        pagination: state.pagination && {
          ...state.pagination,
          ...newState
        }
      };
    }
    case "search": {
      return {
        ...state,
        searchValue: action.payload,
        pagination: state.pagination && {
          ...state.pagination,
          current: 1
        }
      };
    }
    case "sort": {
      let sorters = action.payload;

      if (Object.keys(sorters).length > 1) {
        sorters = sorters.sort((a, b) => {
          // @ts-ignore
          return a.column.sorter?.multiple - b.column.sorter?.multiple;
        });
      }

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
    }
    case "filter": {
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
    }
    case "setNestedTable": {
      const { loadingRows, parentsMap } = state;
      const [expandedRow, result] = action.payload;

      delete loadingRows[expandedRow.key];

      const newState: any = {
        loadingRows
      };

      if (result) {
        const path = getRecordPath(expandedRow.key, parentsMap);
        const nextDataSource = state.dataSource.concat();
        const expandedRecord = findExpandedRecord(path, state.dataSource);
        expandedRecord.nested = result;

        newState.dataSource = nextDataSource;
      }
      return {
        ...state,
        ...newState,
        firstRenderLoader: false
      };
    }
    case "addLoadingRow": {
      return {
        ...state,
        loadingRows: { ...state.loadingRows, [action.payload]: true }
      };
    }
    case "setRowChildren": {
      const { parentsMap, loadingRows } = state;
      const [expandedRow, children] = action.payload;
      const nextDataSource = state.dataSource.concat();
      delete loadingRows[expandedRow.key];
      children &&
        children.forEach(child => {
          parentsMap[child.key] = expandedRow.key;
          child.children = child.has_children ? [] : child.children;
        });

      const path = getRecordPath(expandedRow.key, parentsMap);

      const expandedRecord = findExpandedRecord(path, state.dataSource);
      expandedRecord.children = children;
      return {
        ...state,
        parentsMap,
        dataSource: nextDataSource,
        loadingRows
      };
    }
    case "swapColumns": {
      const [keyFrom, keyTo] = action.payload;
      const nextColumns = state.columns.concat();

      swapColumns(nextColumns, keyFrom, keyTo);
      reindexColumns(nextColumns);

      return {
        ...state,
        columnsSwapped: true,
        columns: nextColumns
      };
    }
    case "expandRow": {
      return {
        ...state,
        expandedRowKeys: state.expandedRowKeys.concat(action.payload.key)
      };
    }
    case "collapseRow": {
      const newState = {
        ...state,
        expandedRowKeys: state.expandedRowKeys.filter(
          key => key !== action.payload.key
        )
      };
      if (
        action.payload.children &&
        Array.isArray(action.payload.children) &&
        action.payload.children.length > 300
      ) {
        const { parentsMap } = state;
        const path = getRecordPath(action.payload.key, parentsMap);
        const nextDataSource = state.dataSource.concat();
        const expandedRecord = findExpandedRecord(path, state.dataSource);
        expandedRecord.children = [];
        newState.dataSource = nextDataSource;
      }
      return newState;
    }
    case "loading": {
      return {
        ...state,
        loading: action.payload
      };
    }
    case "recoveryState": {
      const { columnsPositions, pagination, ...restPayload } = action.payload;
      let nextState = {
        ...state,
        ...restPayload,
        stateIsRecovered: true,
        loading: restPayload.fetchAfterApply ?? false
      };

      if (nextState.pagination && pagination && pagination.pageSize) {
        nextState.pagination.pageSize = pagination.pageSize;
      }

      if (columnsPositions) {
        nextState.columns = (function rec(columns) {
          return columns.map(
            column =>
              ({
                ...column,
                ...state.columnsMap[column.dataIndex],
                order:
                  column.order ?? state.columnsMap[column.dataIndex]?.order,
                children: column.children && rec(column.children as any)
              } as any)
          );
        })(columnsPositions);
      }
      return nextState;
    }
    case "updateRow": {
      const [key, data] = action.payload;
      const { parentsMap, loadingRows, expandedRowKeys } = state;
      delete loadingRows[key];
      const newState: any = {
        loadingRows
      };

      if (data) {
        const nextDataSource = state.dataSource.concat();
        const path = getRecordPath(key, parentsMap);
        let expandedRecord = findExpandedRecord(
          path,
          nextDataSource,
          //@ts-ignore
          data.changeParentData
        );
        //@ts-ignore
        delete data.changeParentData;

        //@ts-ignore
        if (data.expanded === false) {
          newState.expandedRowKeys = expandedRowKeys.filter(
            rowKey => rowKey != key
          );
        }
        if (!Array.isArray(expandedRecord.children)) {
          delete data.children;
        }
        Object.keys(data).forEach(key => {
          expandedRecord[key] = data[key];
        });
        newState.dataSource = nextDataSource;
      }
      return {
        ...state,
        ...newState
      };
    }
    case "update": {
      let nextState = { ...state, ...action.payload };

      // reset filterParams if column is hidden
      const filterParamsList = Object.entries(nextState.filterParams);
      if (
        filterParamsList.length &&
        action.payload.visibleColumnsKeys?.length
      ) {
        let nextFilterParams = {};
        filterParamsList.forEach(([key, value]) => {
          if (action.payload.visibleColumnsKeys.includes(key)) {
            nextFilterParams[key] = value;
          }
        });
        nextState.filterParams = nextFilterParams;
      }

      if (action.payload.columns)
        nextState = reducer(
          { ...nextState, columns: state.columns },
          {
            type: "updateColumns",
            payload: nextState
          }
        );

      if (action.payload.dataSource)
        nextState = reducer(nextState, {
          type: "updateDataSource",
          payload: nextState.dataSource
        });

      if (state.multisorting) {
        const sortParams = nextState.sortParams;
        const nextSortParams = {};

        for (let key in sortParams) {
          if (nextState.visibleColumnsKeys.includes(key)) {
            nextSortParams[key] = sortParams[key];
          }
        }

        if (!isEqual(sortParams, nextSortParams)) {
          if (Object.keys(nextSortParams).length) {
            nextState.sortParams = nextSortParams;
          }
          nextState.columns = setMultisortingForColumns(
            nextState.columns,
            nextSortParams,
            state.sortParamsPriority
          );
        }
      }

      return nextState;
    }

    default:
      return state;
  }
}
