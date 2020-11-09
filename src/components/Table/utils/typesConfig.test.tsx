//@ts-nocheck
import { basicDTypesConfig } from "./typesConfigs";
const { number, string, boolean } = basicDTypesConfig;
describe("Type config test", () => {
  describe("number", () => {
    it("number sorted function works corect", () => {
      expect(number.sorter(3, 2)).toBe(1);
    });
    it("number filter function works corect", () => {
      expect(number.filter(2, 2)).toBeTruthy();
      expect(number.filter(2, 1)).toBeFalsy();
    });
    it("number search function works corect", () => {
      expect(number.search(54321, "32")).toBeTruthy();
      expect(number.search(54321, "45")).toBeFalsy();
    });
    it("number render function works corect", () => {
      expect(number.render(12345)).toBe("12,345");
      expect(number.render()).toBe(undefined);
    });
    it("number toString function works corect", () => {
      expect(number.toString(12345)).toBe("12,345");
      expect(number.toString()).toBe(undefined);
    });
  });

  describe("boolean", () => {
    it("boolean sorted function works corect", () => {
      expect(boolean.sorter(true, false)).toBe(1);
      expect(boolean.sorter(false, true)).toBe(-1);
    });
    it("number toString function works corect", () => {
      expect(boolean.toString(true)).toBe("true");
      expect(boolean.toString(false)).toBe("false");
    });
    it("boolean render function works corect", () => {
      expect(boolean.filter(true, true)).toBeTruthy();
      expect(boolean.filter(false, false)).toBeTruthy();
      expect(boolean.filter(false, true)).toBeFalsy();
      expect(boolean.filter(true, false)).toBeFalsy();
    });
  });

  describe("string", () => {
    it("string sorted function works corect", () => {
      expect(string.sorter("a", "b")).toBe(-1);
      expect(string.sorter("c", "b")).toBe(1);
    });
    it("string filter function works corect", () => {
      expect(string.filter("a", "a")).toBeTruthy();
      expect(string.filter("a", "b")).toBeFalsy();
    });
    it("string search function works corect", () => {
      expect(string.search("HeLlo", "HELL")).toBeTruthy();
      expect(string.search("Hello", "allo")).toBeFalsy();
    });
    it("string toString function works corect", () => {
      expect(string.toString("test string")).toBe("test string");
    });
  });
});
