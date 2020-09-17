import { defineCellType, filterByColumns, swapColumns } from "./utils";
import {
  cell,
  invalidColumn,
  validColumn,
  obj,
  columnsMap,
  columnsMock,
  expectedOutput_filterByColumns
} from "../__mocks__";
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

  describe("filterByColumns", () => {
    it("filterByColumns with empty param objects", () => {
      expect(filterByColumns({}, {})).toMatchObject({});
    });
    it("filterByColumns with first empty param", () => {
      expect(filterByColumns({}, obj)).toMatchObject({});
    });
    it("filterByColumns with second empty param", () => {
      expect(filterByColumns(columnsMap, {})).toMatchObject({});
    });
    it("filterByColumns with valid param", () => {
      expect(filterByColumns(columnsMap, obj)).toMatchObject(
        expectedOutput_filterByColumns
      );
    });
    it("filterByColumns with valid param", () => {
      expect(filterByColumns(columnsMap, obj)).toMatchObject(
        expectedOutput_filterByColumns
      );
    });
    it("filterByColumns with undefined param", () => {
      try {
        filterByColumns(undefined, {});
      } catch (err) {
        expect(err).toThrow(TypeError);
      }
    });
  });
  describe("swapColumns", () => {
    it("swapColumns with undefined param", () => {
      try {
        swapColumns(columnsMock, "keyFrom", "keyTo");
      } catch (err) {
        expect(err).toThrow(TypeError);
      }
    });
    it("swapColumns with  param", () => {
      const mockCallback = jest.fn(swapColumns);
      mockCallback(columnsMock, columnsMock[2].key, columnsMock[4].key);
      expect(mockCallback).toHaveBeenCalledTimes(1);
      mockCallback.mockRestore();
    });
  });
});
