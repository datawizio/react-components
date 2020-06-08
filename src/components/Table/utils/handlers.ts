import {
  FilterHandlerType,
  SearchHandlerType,
  SorterHandlerType
} from "../types";

import { defineCellType } from "./utils";
import { deepFilter } from "../../../utils/deepFilter";

const basicSearchHandler: SearchHandlerType = (
  dataSource,
  searchValue,
  dTypesConfig
) => {
  const expandedRowKeys = [];

  const foundRows = deepFilter(
    dataSource,
    row => {
      return Object.values(row).some(cellVal => {
        const typeConfig = dTypesConfig[defineCellType(cellVal)];

        return (
          typeConfig &&
          typeConfig.search &&
          typeConfig.search(cellVal, searchValue.trim())
        );
      });
    },
    parent => expandedRowKeys.push(parent.key)
  );

  const response = { dataSource: foundRows, expandedRowKeys };

  if (expandedRowKeys.length) {
    response.expandedRowKeys = expandedRowKeys;
  }

  return response;
};

const basicFilterHandler: FilterHandlerType = (
  dataSource,
  filterParams,
  dTypesConfig
) => {
  const filterData = dataSource => {
    return deepFilter(dataSource, row =>
      Object.entries(filterParams).some(([columnKey, filterParameter]) => {
        const cellVal = row[columnKey];
        const typeConfig = dTypesConfig[defineCellType(cellVal)];

        return filterParameter.some(
          filterBy => typeConfig.filter && typeConfig.filter(cellVal, filterBy)
        );
      })
    );
  };

  return {
    dataSource: Object.keys(filterParams).length
      ? filterData(dataSource)
      : dataSource
  };
};

const basicSortHandler: SorterHandlerType = (
  dataSource,
  sortParams,
  dTypesConfig
) => {
  const [dataIndex, order] = Object.entries(sortParams)[0] || [];

  if (!order) return { dataSource };

  const sortData = dataSource => {
    let sortedDataSource = dataSource.sort((aRow, bRow) => {
      const a = aRow[dataIndex];
      const b = bRow[dataIndex];
      const { sorter } = dTypesConfig[defineCellType(a)];

      const compareResult = sorter(a, b);

      if (compareResult !== 0)
        return order === "ascend" ? compareResult : -compareResult;

      return 0;
    });

    sortedDataSource = sortedDataSource.map(item => {
      if (item.children)
        return {
          ...item,
          children: sortData(item.children)
        } as any;

      return item;
    });

    return sortedDataSource;
  };

  return { dataSource: sortData(dataSource) };
};

export { basicSortHandler, basicFilterHandler, basicSearchHandler };
