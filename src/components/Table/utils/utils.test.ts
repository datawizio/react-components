import { defineCellType, filterByColumns, swapColumns } from "./utils";
import { cell, invalidColumn, validColumn } from "./__mocks__";
import { BodyCellType, IColumn, TableState } from "../types";

describe("Utils", () => {
  describe("defineCellType", () => {
    it("defineCellType basic", () => {
      expect(defineCellType(cell, validColumn)).toBe(validColumn.dtype);
    });

    it("defineCellType without column.dType", () => {
      expect(defineCellType(cell, invalidColumn)).toBe(typeof cell);
    });
  });

  // describe("filterByColumns", () => {
  //   it("filterByColumns basic", () => {
  //     expect(filterByColumns(cell, validColumn)).toBe(validColumn.dtype);
  //   });
  // });
});
