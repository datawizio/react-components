import { DTypeConfig } from "../types";

const basicDTypesConfig = {
  "number": {
    sorter: (a, b) => a - b,
    toString: value => value && value.toLocaleString(),
    filter: (value, filterBy) => value === filterBy,
    search: (value, searchBy) => {
      if (searchBy.includes(";")) {
        return basicDTypesConfig["number"].multiSearch(value, searchBy);
      }
      return value.toString().includes(searchBy);
    },
    multiSearch: (value, searchBy) => {
      const searchByArr = searchBy
        .trim()
        .split(";")
        .filter(i => i);
      return searchByArr.some(
        str =>
          str.trim() &&
          value.toString().trim().includes(str.trim().toLowerCase())
      );
    },
    render: value =>
      value && value.toLocaleString(undefined, { maximumFractionDigits: 4 })
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
    search: (value, searchBy) => {
      if (searchBy.includes(";")) {
        return basicDTypesConfig["string"].multiSearch(value, searchBy);
      }
      return value.toLowerCase().includes(searchBy.toLowerCase());
    },
    multiSearch: (value, searchBy) => {
      const searchByArr = searchBy
        .trim()
        .split(";")
        .filter(i => i);
      return searchByArr.some(
        str =>
          str.trim() &&
          value.trim().toLowerCase().includes(str.trim().toLowerCase())
      );
    }
  } as DTypeConfig<string>
};

export { basicDTypesConfig };
