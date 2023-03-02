import {
  BodyCellType,
  IColumn,
  SortParams,
  SortParamsPriority,
  TableState
} from "../types";

function defineCellType(cell: BodyCellType, column: IColumn): string {
  const dType =
    column && column.dtype !== "object" ? column.dtype : (cell as any)?.dtype;
  return dType || typeof cell;
}

function filterByColumns(
  columnsMap: TableState["columnsMap"],
  obj: { [columnKey: string]: any }
) {
  return Object.keys(obj).reduce((acc, columnKey) => {
    if (columnsMap[columnKey]) acc[columnKey] = obj[columnKey];
    return acc;
  }, {});
}

function swapColumns(
  columns: Array<IColumn>,
  keyFrom: IColumn["key"],
  keyTo: IColumn["key"]
) {
  columns.some((column, idxFrom) => {
    if (keyFrom === column.key) {
      const idxTo = columns.findIndex(column => column.key === keyTo);
      if (idxTo !== -1) {
        columns.splice(idxTo, 0, columns.splice(idxFrom, 1)[0]);
      }
      return true;
    }

    return (
      column.children?.length && swapColumns(column.children, keyFrom, keyTo)
    );
  });
}

function reindexColumns(columns: Array<IColumn> = []) {
  columns.forEach((column, idx) => {
    column.order = idx;
  });
}

function getVisibleColumns(columns: Array<IColumn>) {
  let flatList = true;

  const dig = (columns: Array<IColumn>) => {
    let result = [];
    columns.forEach(column => {
      const isParent = column.children?.length;
      if (!isParent && column.default_visible !== false) {
        result.push(column.key);
      }
      if (isParent) {
        flatList = false;
        result = result.concat(dig(column.children));
      }
    });
    return result;
  };

  let result = dig(columns);
  if (flatList) {
    return result.length === columns.length ? [] : result;
  }
  return result;
}

const setMultisortingForColumns = (
  columns: IColumn[],
  sortParams: SortParams,
  sortParamsPriority?: SortParamsPriority
): IColumn[] => {
  if (!columns) return [];
  let keys = Object.keys(sortParams);
  if (!keys.length) return columns;

  if (sortParamsPriority) {
    keys = keys.sort((a: string, b: string) => {
      return sortParamsPriority[a] - sortParamsPriority[b];
    });
  }

  return columns.map((col: IColumn) => {
    let multiple = 999;
    if (keys.includes(col.key as string)) {
      const i = keys.findIndex(k => k === col.key);
      if (i !== -1) {
        multiple = i + 1;
      }
    }
    return {
      ...col,
      sorter: {
        multiple
      }
    };
  });
};

export {
  defineCellType,
  getVisibleColumns,
  swapColumns,
  filterByColumns,
  reindexColumns,
  setMultisortingForColumns
};
