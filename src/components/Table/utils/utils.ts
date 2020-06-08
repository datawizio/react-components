import { BodyCellType } from "../types";

const defineCellType = (cell: BodyCellType): string => {
  return typeof cell === "object" ? cell.dtype : typeof cell;
};

export { defineCellType };
