import { getUniqueItems } from "./dataHelpers";
import { genItems } from "./dataGenerators";

describe("dataHelpers utils", () => {
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
