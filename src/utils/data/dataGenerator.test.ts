import { genUsersData } from "./dataGenerators";

describe("data generation utils", () => {
  describe("genUserData", () => {
    it("returns the correct number of users", () => {
      expect(genUsersData(5).length).toBe(5);
    });

    it("returns the correct obj with fullName property", () => {
      expect(genUsersData(1)[0]).toHaveProperty("fullName");
    });
    it("returns the correct obj with avatar property", () => {
      expect(genUsersData(1)[0]).toHaveProperty("avatar");
    });
    it("returns the correct obj with address property", () => {
      expect(genUsersData(1)[0]).toHaveProperty("address");
    });
  });
});
