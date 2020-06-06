import {
  TableState,
  FilterHandlerType,
  SearchHandlerType,
  SorterHandlerType
} from "../types";

import { defineCellType, deepFilter } from "./utils";

import { saveAs } from "file-saver";
import ExcelJS from "exceljs/dist/exceljs.min.js";

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
          typeConfig.search(cellVal, searchValue)
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

export async function exportTableToXLSX(
  columns: TableState["columns"],
  dataSource: TableState["dataSource"]
) {
  function getDeepMaxLevel(columns) {
    let maxLevel = 1;

    (function rec(columns, level = 1) {
      columns.forEach(column => {
        if (column.children && column.children.length)
          rec(column.children, level + 1);
        if (level > maxLevel) maxLevel = level;
      });
    })(columns);

    return maxLevel;
  }

  function getDeepChildren(columns) {
    let deepChildren = [];

    (function rec(columns) {
      columns.forEach(column => {
        if (column.children && column.children.length) rec(column.children);
        else deepChildren.push(column);
      });
    })(columns);

    return deepChildren;
  }

  const wb = new ExcelJS.Workbook(); // make a workbook
  const ws = wb.addWorksheet("test"); // make a worksheet
  const columnsMaxLevel = getDeepMaxLevel(columns);

  (function drawColumns(columns, rowIdx = 1, colIdx = 1) {
    columns.forEach(column => {
      const row = ws.getRow(rowIdx);
      const cell = row.getCell(colIdx);

      cell.value = column.title;
      // set center alignment for cell of columns
      cell.alignment = {
        horizontal: "center",
        vertical: "middle"
      };

      if (column.children && column.children.length) {
        const childrenCount = getDeepChildren(column.children).length;
        const nextCellIdx = colIdx + (childrenCount - 1);
        const nextCell = row.getCell(nextCellIdx);

        ws.mergeCells(`${cell.address}:${nextCell.address}`);
        drawColumns(column.children, rowIdx + 1, colIdx);

        colIdx = colIdx + childrenCount;
      } else {
        const letter = cell._column.letter;

        ws.mergeCells(`${cell.address}:${letter}${columnsMaxLevel}`);
        ++colIdx;
      }
    });
  })(columns);

  // add columns
  ws.columns = getDeepChildren(columns).map(({ dataIndex, width }) => ({
    key: dataIndex,
    width: Number(width || 200) / 10
  }));

  // recursive add row for tree table
  (function drawRows(rows: Array<any>, level: number = 0) {
    rows.forEach(rowData => {
      const { children, ...restRowData } = rowData;
      const margin = "  ".repeat(level);
      const firstColumn = ws.getColumn(1).key;

      const row = ws.addRow({
        ...restRowData,
        [firstColumn]: margin + rowData[firstColumn]
      });

      row.hidden = level !== 0;
      row.outlineLevel = level;

      if (children) drawRows(children, level + 1);
    });
  })(dataSource);

  saveAs(new Blob([await wb.xlsx.writeBuffer()]), "test.xlsx");
}

export { basicSortHandler, basicFilterHandler, basicSearchHandler };
