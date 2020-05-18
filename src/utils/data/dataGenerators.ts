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

export function genColumns(
  count
): Array<{ key: string; title: string; dataIndex: string }> {
  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

  return faker.definitions.lorem.words.slice(0, count).map((word, idx) => ({
    key: idx.toString(),
    dataIndex: word,
    dType: idx === 0 ? "String" : "Number",
    title: capitalize(word)
  }));
}

export function genDataSource(count, columns, dataGenerator?: (column) => {}) {
  const cellDataGenerators = {
    "String": faker.random.word,
    "Number": faker.random.number
  };

  return new Array(count).fill(null).map((_, idx) =>
    columns.reduce(
      (acc, column) => {
        acc[column.dataIndex] = dataGenerator
          ? dataGenerator(column)
          : cellDataGenerators[column.dType]();

        return acc;
      },
      { key: idx }
    )
  );
}
