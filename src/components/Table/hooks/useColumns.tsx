import React, { useMemo } from "react";
import CellData from "../components/CellData";
import { IColumn, TableProps, TableState } from "../types";

function useColumns(state: TableState, props: TableProps): Partial<TableState> {
  const { columns, visibleColumnsKeys } = state;
  const { sortable, columnsConfig, isResizableColumns } = props;

  return useMemo(() => {
    function initColumns(columns: Array<IColumn>, level = 1) {
      return columns
        .reduce((acc, column, idx) => {
          const nextColumn: IColumn = {
            ...column,
            ...(columnsConfig[column.key] || {})
          };

          if (
            !nextColumn.fixed &&
            visibleColumnsKeys &&
            !visibleColumnsKeys.includes(nextColumn.key)
          ) {
            return acc;
          }

          if (nextColumn.children) {
            nextColumn.children = initColumns(nextColumn.children, level + 1);
          } else {
            nextColumn.sorter = nextColumn.hasOwnProperty("sorter")
              ? nextColumn.sorter
              : sortable;
          }

          if (!nextColumn.hasOwnProperty("render")) {
            nextColumn.render = (value, record, index) => {
              return (
                <CellData
                  row={record}
                  value={value}
                  xIndex={index}
                  columnLevel={level}
                  column={nextColumn}
                  // TODO
                  yIndex={nextColumn.fixed === "left" ? 0 : idx + 1}
                />
              );
            };
          }

          if (!nextColumn.hasOwnProperty("resizable") && level === 1) {
            nextColumn.resizable = isResizableColumns;
          }

          nextColumn.onHeaderCell = () =>
            ({ model: { ...nextColumn }, level } as any);

          return acc.concat(nextColumn);
        }, [])
        .sort((a, b) => +Boolean(b.fixed) - +Boolean(a.fixed));
    }

    return {
      columns: initColumns(columns)
    };
  }, [
    columns,
    sortable,
    columnsConfig,
    isResizableColumns,
    visibleColumnsKeys
  ]);
}

useColumns.displayName = "useColumns";

export default useColumns;
