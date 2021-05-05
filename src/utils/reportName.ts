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
  res = result.length === 3 ? `${result[0]}_${result[2]}` : result[0];
  return res || defaultReportName;
};
