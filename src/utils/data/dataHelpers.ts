export function getUniqueItems(items: any = [], key: string = "key") {
  const keys = new Set();
  const result = [];

  items.forEach(item => {
    if (keys.has(item[key])) return;

    keys.add(item.key);
    result.push(item);
  });
  return result;
}

export function getUniqueItemsObj(
  items: any = [],
  obj: any = {},
  key: string = "key",
  valueKey: string = "value"
) {
  const result = obj;
  items.forEach(item => {
    if (result[item[key]]) return;
    result[item[key]] = item[valueKey];
  });
  return result;
}
