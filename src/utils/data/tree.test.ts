import { generateTreeList } from "./tree";

describe("generateTreeList utils", () => {
  const path = "qwerty";
  it("return corect default node length", () => {
    expect(generateTreeList(path, 1).length).toBe(10);
  });

  it("return corect default child node length", () => {
    expect(generateTreeList(path, 2)[0].children.length).toBe(10);
  });

  it("return corect default node shape", () => {
    expect(generateTreeList(path, 1)[0]).toHaveProperty("title");
    expect(generateTreeList(path, 1)[0]).toHaveProperty("key");
    expect(generateTreeList(path, 1)[0]).toHaveProperty("value");
    expect(generateTreeList(path, 1)[0]).toHaveProperty("children");
  });

  it("return corect default child node length", () => {
    expect(generateTreeList(path, 1)[0].key).toContain(path);
  });
});
