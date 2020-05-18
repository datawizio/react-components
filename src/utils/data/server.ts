import { genUsersData } from "./dataGenerators";

function serverReturn(returnValue, timeout): Promise<any> {
  return new Promise(resolve =>
    setTimeout(() => resolve(returnValue), timeout)
  );
}

function fetchUsers(
  count = 100
): Promise<Array<{ avatar: string; fullName: string; address: string }>> {
  return serverReturn(genUsersData(count), 1000);
}

export default { fetchUsers };
