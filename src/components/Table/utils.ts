import { TColumnSorter, IColumn } from "./types";

export function globalSorter<T = any>(ARow: T, BRow: T) {
  const self: IColumn = this;

  const a = ARow[self.dataIndex];
  const b = BRow[self.dataIndex];

  switch (self.dType) {
    case "Number":
      return a - b;
    case "Boolean":
      return +a - +b;
    case "String":
      return a.localeCompare(b);
  }
}

export function bindSorterContext(
  sorter: TColumnSorter<any>,
  context: any
): TColumnSorter<any> {
  if (typeof sorter === "function") {
    return sorter.bind(context);
  }

  if (typeof sorter === "object" && sorter.compare) {
    return {
      compare: bindSorterContext(sorter.compare, context),
      ...sorter
    };
  }

  return sorter;
}
