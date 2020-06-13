import React, { useMemo } from "react";
import BodyCell from "../components/BodyCell";
import { defineCellType } from "../utils/utils";
import { IColumn, TableProps, TableState } from "../types";

function useColumns(state: TableState, props: TableProps): Partial<TableState> {
  const {
    sortable,
    columnsConfig,
    cellRenderProps,
    isResizableColumns
  } = props;

  const { columns, visibleColumnsKeys, dTypesConfig } = state;

  return useMemo(() => {
    function initColumns(columns: Array<IColumn>, level = 1) {
      return columns
        .reduce((acc, column) => {
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
                <BodyCell
                  value={value}
                  index={index}
                  renderProps={cellRenderProps}
                  typeConfig={dTypesConfig[defineCellType(value, nextColumn)]}
                />
              );
            };
          }

          if (!nextColumn.hasOwnProperty("resizable") && level === 1) {
            nextColumn.resizable = isResizableColumns;
          }

          nextColumn.onHeaderCell = () => ({ model: { ...nextColumn } } as any);

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
    dTypesConfig,
    columnsConfig,
    cellRenderProps,
    isResizableColumns,
    visibleColumnsKeys
  ]);
}

useColumns.displayName = "useColumns";

export default useColumns;
