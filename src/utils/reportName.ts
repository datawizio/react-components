export const getReportName = (
  pathname: string = window.location.pathname,
  defaultReportName: string = ""
): string => {
  let res: string;

  const matchedData = pathname.match(/\/c\/\d+\/(.*)/i);
  res = matchedData && matchedData.length === 2 ? matchedData[1] : pathname;
  res = res.split("/")[0];
  res = res.length === 3 ? `${res[0]}_${res[2]}` : res[0];
  return res || defaultReportName
};