import { BodyCellType, IColumn, TableState } from "../types";

function defineCellType(cell: BodyCellType, column: IColumn): string {
  const dType =
    column && column.dtype !== "object" ? column.dtype : (cell as any).dtype;
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

      if (idxTo !== -1)
        [columns[idxFrom], columns[idxTo]] = [columns[idxTo], columns[idxFrom]];

      return true;
    }

    return (
      column.children &&
      column.children.length &&
      swapColumns(column.children, keyFrom, keyTo)
    );
  });
}

function getVisibleColumns(columns: Array<IColumn>) {
  const result = [];
  columns.forEach(column => {
    if (column.default_visible !== false) result.push(column.key);
  });
  return result.length === columns.length ? [] : result;
}

export { defineCellType, getVisibleColumns, swapColumns, filterByColumns };
