import { BodyCellType } from "../types";

const defineCellType = (cell: BodyCellType): string => {
  return typeof cell === "object" ? cell.type : typeof cell;
};

function deepFilter<T = any>(
  node: Array<T>,
  callback: (item: T) => boolean,
  onFoundParent?: (parent: T) => void,
  deepProp = "children"
) {
  return [...node].reduce((acc, item) => {
    if (item[deepProp] && item[deepProp].length) {
      const children = deepFilter(
        item[deepProp],
        callback,
        onFoundParent,
        deepProp
      );
      if (children && children.length) {
        const foundParent = { ...item, children };
        onFoundParent && onFoundParent(foundParent);
        return acc.concat(foundParent);
      }
    }

    const isCoincided = callback(item);

    return isCoincided ? acc.concat(item) : acc;
  }, []);
}

export { defineCellType, deepFilter };
