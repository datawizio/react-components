import { BodyCellType, IColumn } from "../types";

function defineCellType(cell: BodyCellType, column: IColumn): string {
  const dType =
    column && column.dtype === "object" ? column.dtype : (cell as any).dtype;
  return dType || typeof cell;
}

export { defineCellType };
