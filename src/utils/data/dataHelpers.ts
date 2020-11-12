export function getUniqueItems(items: any = [], key: string = "key") {
  return items.reduce((acc, curr) => {
    const accKeys = new Set(acc.map(item => item[key]));
    if (!accKeys.has(curr[key])) acc.push(curr);
    return acc;
  }, []);
}
