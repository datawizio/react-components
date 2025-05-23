export const ignoredFilters = ["category_level", "shop_markers", "shop_level"];

export const defaultAbcXyzValues = {
  by: "chain",
  turnover_abc: { a: 80, b: 15, c: 5, select: null },
  products_qty_abc: { a: 80, b: 15, c: 5, select: null },
  receipts_qty_abc: { a: 80, b: 15, c: 5, select: null },
  profit_abc: { a: 80, b: 15, c: 5, select: null },
  actual_stock_qty_abc: { a: 80, b: 15, c: 5, select: null },
  actual_stock_values_abc: { a: 80, b: 15, c: 5, select: null },
  price_abc: { a: 0, b: 50, c: 100, last: "∞", select: null },
  coefficient_of_variation_abc: { x: 0.4, y: 0.6, z: 10, select: null }
};

export const abcXyzMetricsOrder = [
  "by",
  "turnover_abc",
  "products_qty_abc",
  "receipts_qty_abc",
  "profit_abc",
  "actual_stock_qty_abc",
  "actual_stock_values_abc",
  "price_abc",
  "coefficient_of_variation_abc"
];
