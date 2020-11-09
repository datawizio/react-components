import server from "./server";

describe("Mock server", () => {
  it("fetchUsers return correct count of user", async () => {
    const userCount = 10;
    const users = await server.fetchUsers(userCount);

    expect(users.length).toBe(userCount);
  });

  it("fetchUsers return correct user shape", async () => {
    const users = await server.fetchUsers(2);

    expect(users[0]).toHaveProperty("avatar");
    expect(users[0]).toHaveProperty("fullName");
    expect(users[0]).toHaveProperty("address");
  });

  it("fetchTableData return correct count of items", async () => {
    const tableDataCount = 10;
    const dableData = await server.fetchUsers(tableDataCount);

    expect(dableData.length).toBe(tableDataCount);
  });

  it("fetchTableData return correct data shape", async () => {
    const dableData = await server.fetchTableData(2, [] as any);

    expect(dableData).toHaveProperty("columns");
    expect(dableData).toHaveProperty("dataSource");
  });
});
