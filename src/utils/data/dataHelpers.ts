import faker from "faker";

export function genItems(
  count: number
): Array<{ key: number | string; title: string; }> {
  return new Array(count).fill(null).map(() => {
    return {
      key: faker.random.uuid(),
      title: faker.random.word()
    };
  });
}

export function getUniqueItems(items: any = [], key: string = "key") {
  return items.reduce((acc, curr) => {
    const accKeys = new Set(acc.map(item => item[key]));
    if (!accKeys.has(curr[key])) acc.push(curr);
    return acc;
  }, []);
}
