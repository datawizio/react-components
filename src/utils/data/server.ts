import faker from "faker";

function fetchUsers(
  count = 100
): Promise<Array<{ avatar: string; fullName: string; address: string }>> {
  return new Promise(resolve =>
    setTimeout(
      () =>
        resolve(
          new Array(count).fill(null).map(() => {
            return {
              avatar: faker.image.avatar(),
              fullName: faker.name.findName(),
              address: faker.address.streetAddress()
            };
          })
        ),
      1000
    )
  );
}

export default { fetchUsers };
