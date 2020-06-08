import { BodyCellType } from "../types";

const defineCellType = (cell: BodyCellType): string => {
  return typeof cell === "object" ? cell.type : typeof cell;
};

export { defineCellType };
