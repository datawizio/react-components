import { DTypeConfig } from "../types";

const basicDTypesConfig = {
  "number": {
    sorter: (a, b) => a - b,
    toString: value => value && value.toLocaleString(),
    filter: (value, filterBy) => value === filterBy,
    search: (value, searchBy) => value.toString().includes(searchBy),
    render: value => value && value.toLocaleString()
  } as DTypeConfig<number>,

  "boolean": {
    sorter: (a, b) => +a - +b,
    toString: value => value.toString(),
    filter: (value, filterBy) => value === filterBy
  } as DTypeConfig<boolean>,

  "string": {
    toString: value => value,
    sorter: (a, b) => a.localeCompare(b),
    filter: (value, filterBy) => value === filterBy,
    search: (value, searchBy) =>
      value.toLowerCase().includes(searchBy.toLowerCase())
  } as DTypeConfig<string>
};

export { basicDTypesConfig };
