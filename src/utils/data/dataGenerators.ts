import faker from "faker";

export function genUsersData(
  count
): Array<{ avatar: string; fullName: string; address: string }> {
  return new Array(count).fill(null).map(() => {
    return {
      avatar: faker.image.avatar(),
      fullName: faker.name.findName(),
      address: faker.address.streetAddress()
    };
  });
}

export function genColumns(count, isTree) {
  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

  return (function genColsRec(childCount = count, level = 1) {
    const nextColumns = faker.definitions.lorem.words
      .slice(0, childCount)
      .map((word, idx) => ({
        key: idx.toString() + "-" + faker.random.number() + "-" + level,
        dataIndex: word + level + idx + "-" + faker.random.number(),
        title: capitalize(word)
      }));

    if (isTree) {
      nextColumns.forEach((column, idx) => {
        if (idx && faker.random.boolean()) {
          column.children = genColsRec(
            faker.random.number({ min: 1, max: 2 }),
            level + 1
          );
        }
      });
    }

    return nextColumns;
  })();
}

export function genDataSource(
  count,
  columns,
  types: Array<string> = [],
  isTree: boolean = false,
  level: number = 0
) {
  const flat = (columns, acc = []) => {
    columns.forEach(column => {
      if (column.children) flat(column.children, acc);
      else acc.push(column);
    });
    return acc;
  };

  const cellDataGenerators = {
    "string": faker.random.word,
    "number": faker.random.number,
    "link": () => ({
      type: "link",
      value: faker.random.word()
    })
  };

  const flatColumns = flat(columns);

  const dataSource = new Array(count).fill(null).map((_, idx) =>
    flatColumns.reduce(
      (acc, column, idx) => {
        const dataGenerator = cellDataGenerators[types[idx]];
        acc[column.dataIndex] = dataGenerator
          ? dataGenerator()
          : cellDataGenerators["number"]();

        return acc;
      },
      { key: `${idx}-${level}` }
    )
  );

  if (isTree) {
    dataSource.forEach(item => {
      if (faker.random.boolean())
        item.children = genDataSource(
          faker.random.number({ min: 1, max: 5 }),
          columns,
          types,
          faker.random.boolean(),
          level + 1
        );
    });
  }

  return dataSource;
}

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
