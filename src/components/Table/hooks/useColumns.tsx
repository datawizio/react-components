import React, { useMemo } from "react";
import CellData from "../components/CellData";
import { IColumn, TableProps, TableState } from "../types";

function useColumns(state: TableState, props: TableProps): Partial<TableState> {
  const { columns, visibleColumnsKeys, sortParams, filterParams } = state;
  const { sortable, columnsConfig, isResizableColumns } = props;

  const initializedColumns = useMemo(() => {
    function initColumns(columns: Array<IColumn>, level = 1) {
      return columns
        .reduce((acc, column, idx) => {
          const nextColumn: IColumn = {
            ...column,
            ...(columnsConfig[column.key] || {})
          };

          const isParent = nextColumn.children && nextColumn.children.length;
          const hasCheckedChildren =
            isParent &&
            nextColumn.children.find(child =>
              visibleColumnsKeys.includes(child.key)
            );

          if (
            !nextColumn.fixed &&
            visibleColumnsKeys &&
            visibleColumnsKeys.length &&
            !visibleColumnsKeys.includes(nextColumn.key) &&
            !hasCheckedChildren
          ) {
            return acc;
          }

          if (isParent) {
            nextColumn.sorter = false;
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

    return initColumns(columns);
  }, [
    columns,
    sortable,
    columnsConfig,
    isResizableColumns,
    visibleColumnsKeys
  ]);

  const nextColumns = useMemo(() => {
    return (function rec(columns) {
      return columns.map((column: IColumn) => {
        const record = {
          ...column,
          sortOrder: sortParams[column.dataIndex],
          filteredValue:
            column.filters && filterParams[column.dataIndex]
              ? filterParams[column.dataIndex]
              : []
        };
        if (column.children && column.children.length) {
          record.children = rec(column.children);
        }
        return record;
      });
    })(initializedColumns);
  }, [sortParams, filterParams, initializedColumns]);

  return {
    columns: nextColumns
  };
}

useColumns.displayName = "useColumns";

export default useColumns;
