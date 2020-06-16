import { BodyCellType, IColumn } from "../types";

function defineCellType(cell: BodyCellType, column: IColumn): string {
  const dType =
    column && column.dtype !== "object" ? column.dtype : (cell as any).dtype;
  return dType || typeof cell;
}

function swapColumns(columns, keyFrom, keyTo) {
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

export { defineCellType, swapColumns };
