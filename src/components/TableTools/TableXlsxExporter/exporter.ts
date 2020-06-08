import { saveAs } from "file-saver";
import { TableState } from "../../Table/types";
import ExcelJS from "exceljs/dist/exceljs.min.js";

export async function exportTableToXLSX(
  columns: TableState["columns"],
  dataSource: TableState["dataSource"],
  filename: string,
  sheetName?: string
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
  const ws = wb.addWorksheet(sheetName || filename); // make a worksheet
  const columnsMaxLevel = getDeepMaxLevel(columns);

  // recursive draw columns
  (function drawColumns(columns, rowIdx = 1, colIdx = 1) {
    columns.forEach(column => {
      const row = ws.getRow(rowIdx);
      const cell = row.getCell(colIdx);

      // set column title
      cell.value = column.title;
      // set center alignment for cell of columns
      cell.alignment = {
        horizontal: "center",
        vertical: "middle"
      };

      // check children for correct merge cells width
      if (column.children && column.children.length) {
        const childrenCount = getDeepChildren(column.children).length;
        const nextCellIdx = colIdx + (childrenCount - 1);
        const nextCell = row.getCell(nextCellIdx);

        ws.mergeCells(`${cell.address}:${nextCell.address}`);
        drawColumns(column.children, rowIdx + 1, colIdx);

        colIdx = colIdx + childrenCount;
      } else {
        // if not child stretch height of cell to max children level of columns
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

  saveAs(new Blob([await wb.xlsx.writeBuffer()]), filename + ".xlsx");
}
