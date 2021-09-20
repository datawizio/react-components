export const getReportName = (
  pathname: string = window.location.pathname,
  defaultReportName: string = ""
): string => {
  let res: string;

  const matchedData = pathname.match(/\/c\/\d+(.*)/i);
  res = matchedData && matchedData.length === 2 ? matchedData[1] : pathname;

  if (res[0] === "/") {
    res = res.substring(1);
  }

  let result: string[] = res.split("/");
  //res = result.length === 3 ? `${result[0]}_${result[2]}` : result[0];

  const idx = result.findIndex(item => item === "report");
  if (idx !== -1) {
    return result[idx + 1];
  }

  let cardIdx = -1;
  result.forEach((item: string, idx: number) => {
    if (cardSlugs.has(item)) cardIdx = idx;
  });

  if (cardIdx !== -1) {
    return result[cardIdx];
  }

  return defaultReportName;
};

export const cardSlugs = new Set([
  "product",
  "shop",
  "category",
  "brand",
  "loyalty",
  "promotion",
  "supplier",
  "producer",
  "category-manager"
]);
