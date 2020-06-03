import React from "react";
import { useMemo } from "react";
import BodyCell from "../components/BodyCell";
import { IColumn, TableProps, TableState } from "../types";
import { defineCellType, deepFilter } from "../utils/utils";

function useColumns(state: TableState, props: TableProps) {
  const {
    sortable,
    columnsConfig,
    cellRenderProps,
    isResizableColumns
  } = props;

  const { columns, dTypesConfig } = state;

  const { visibleColumnsKeys } = state;

  const visibleColumns = useMemo(() => {
    const nextVisibleColumns =
      visibleColumnsKeys &&
      visibleColumnsKeys.length &&
      deepFilter(columns, column => visibleColumnsKeys.includes(column.key));

    return nextVisibleColumns && nextVisibleColumns.length
      ? nextVisibleColumns
      : columns;
  }, [columns, visibleColumnsKeys]);

  return useMemo(() => {
    return (function initColumns(columns: Array<IColumn>) {
      return columns.map(column => {
        const nextColumn: IColumn = {
          ...column,
          ...(columnsConfig[column.key] || {})
        };

        if (nextColumn.children) {
          nextColumn.children = initColumns(nextColumn.children);
        } else {
          nextColumn.sorter = nextColumn.hasOwnProperty("sorter")
            ? nextColumn.sorter
            : sortable;
        }

        if (!nextColumn.hasOwnProperty("render")) {
          nextColumn.render = (value, record, index) => {
            return (
              <BodyCell
                value={value}
                index={index}
                renderProps={cellRenderProps}
                typeConfig={dTypesConfig[defineCellType(value)]}
              />
            );
          };
        }

        if (!nextColumn.hasOwnProperty("resizable")) {
          nextColumn.resizable = isResizableColumns;
        }

        nextColumn.onHeaderCell = () => ({ model: { ...nextColumn } } as any);

        return nextColumn;
      });
    })(visibleColumns || []);
  }, [
    sortable,
    dTypesConfig,
    columnsConfig,
    visibleColumns,
    cellRenderProps,
    isResizableColumns
  ]);
}

useColumns.displayName = "useColumns";

export default useColumns;
