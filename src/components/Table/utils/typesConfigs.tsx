import { DTypeConfig } from "../types";

const basicDTypesConfig = {
  "number": {
    sorter: (a, b) => a - b,
    filter: (value, filterBy) => value === filterBy,
    search: (value, searchBy) => value.toString().includes(searchBy),
    render: value => value.toLocaleString()
  } as DTypeConfig<number>,

  "boolean": {
    sorter: (a, b) => +a - +b,
    filter: (value, filterBy) => value === filterBy
  } as DTypeConfig<boolean>,

  "string": {
    sorter: (a, b) => a.localeCompare(b),
    filter: (value, filterBy) => value === filterBy,
    search: (value, searchBy) =>
      value.toLowerCase().includes(searchBy.toLowerCase())
  } as DTypeConfig<string>
};

export { basicDTypesConfig };
