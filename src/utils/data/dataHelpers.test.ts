import { genItems, getUniqueItems } from "./dataHelpers";

describe("dataHelpers utils", () => {
  it("genItems() generates data correctly", () => {
    const count = 5;
    const items = genItems(count);
    expect(items.length).toBe(count);
    expect(items[0]).toHaveProperty("key");
    expect(items[0]).toHaveProperty("title");
  });

  it("getUniqueItems() returns unique items", () => {
    const count = 5;
    const items = genItems(count);
    const itemsKeys = items.map(item => item.key);
    const itemsDuplicated = [...items, items[0]];
    const uniqueItems = getUniqueItems(itemsDuplicated);
    const uniqueItemsKeys = uniqueItems.map(item => item.key);
    expect(uniqueItemsKeys.filter(key => key === itemsKeys[0]).length).toBe(1);
  });
});
