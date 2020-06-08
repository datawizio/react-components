import { genUsersData, genDataSource } from "./dataGenerators";
import { TableProps } from "../../components/Table/types";

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

function fetchTableData(dataCount, columns): Promise<Partial<TableProps>> {
  const dataSource = genDataSource(dataCount, columns);
  return serverReturn({ columns, dataSource }, 1000);
}

export default { fetchUsers, fetchTableData };
