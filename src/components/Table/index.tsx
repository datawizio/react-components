import * as React from "react";
import { Table as AntdTable } from "antd";
import { useMemo, useCallback, useState } from "react";
import { globalSorter, bindSorterContext } from "./utils";

import Column from "./Column";
import TableWrapper from "./TableWrapper";

import { TableProps, IColumn } from "./types";
import { SorterResult } from "antd/lib/table/interface";

import "./index.less";

const Table: React.FC<TableProps> = props => {
  const {
    style,
    width,
    height,
    sortable,
    defaultSorter,
    columnsConfig,
    multipleSorting,
    resizableColumns,
    ...restProps
  } = props;

  const [sortSequence, setSortSequence] = useState<Array<string>>([]);

  const handleSort = useCallback(
    (sorter: Array<SorterResult<any>> | SorterResult<any>) => {
      const sorters = [].concat(sorter);

      const sortedKeys = sorters
        .filter(item => item.order)
        .map(item => item.columnKey)
        .sort((a, b) => {
          if (sortSequence.indexOf(a) === -1) return 1;
          return sortSequence.indexOf(a) - sortSequence.indexOf(b);
        });

      setSortSequence(sortedKeys);
    },
    [sortSequence]
  );

  const handleChangeTable = useCallback<TableProps["onChange"]>(
    (pagination, filters, sorter) => {
      handleSort(sorter);
    },
    [handleSort]
  );

  const bindSorter = useCallback(
    column => {
      if (!sortable) return sortable;

      let sorter = bindSorterContext(
        column.hasOwnProperty("sorter") ? column.sorter : defaultSorter,
        { ...column }
      );

      if (multipleSorting && typeof sorter === "function")
        sorter = {
          compare: sorter,
          multiple: sortSequence.indexOf(String(column.key)) + 1
        };

      return sorter;
    },
    [sortable, defaultSorter, multipleSorting, sortSequence]
  );

  const columns = useMemo(() => {
    function initColumns(columns: Array<IColumn>, level = 1) {
      return columns.map(column => {
        const nextColumn: IColumn = {
          ...column,
          ...(columnsConfig[column.key] || {})
        };

        if (!nextColumn.hasOwnProperty("resizable"))
          nextColumn.resizable = resizableColumns;

        if (nextColumn.children) {
          nextColumn.children = initColumns(nextColumn.children, level + 1);
        } else {
          nextColumn.sorter = bindSorter(nextColumn);
        }

        nextColumn.onHeaderCell = () =>
          ({
            level,
            size: restProps.size,
            model: { ...nextColumn }
          } as any);

        return nextColumn;
      });
    }

    return initColumns(props.columns);
  }, [
    props.columns,
    columnsConfig,
    bindSorter,
    resizableColumns,
    restProps.size
  ]);

  const customComponents = useMemo<TableProps["components"]>(
    () => ({
      table: props => <TableWrapper {...props} style={{ height, width }} />,
      header: { cell: Column }
    }),
    [height, width]
  );

  return (
    <AntdTable
      {...(restProps as any)}
      className="dw-table"
      columns={columns}
      onChange={handleChangeTable}
      components={customComponents}
    />
  );
};

Table.defaultProps = {
  bordered: true,
  sortable: true,
  resizableColumns: true,

  multipleSorting: false,
  showSorterTooltip: false,

  width: "auto",
  height: "auto",
  size: "small",
  tableLayout: "auto",

  columnsConfig: {},
  defaultSorter: globalSorter
};

export default Table;
