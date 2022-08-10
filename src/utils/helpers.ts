export const isNumeric = (str: string) => {
  if (typeof str !== "string") return false;
  return !isNaN(+str) && !isNaN(parseFloat(str));
};

export const formatNumericValue = (value: number) => {
  if (typeof value !== "number") return value;
  return value.toLocaleString(undefined, { maximumFractionDigits: 4 });
};