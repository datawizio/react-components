import * as React from "react";
import { useMemo, useContext } from "react";

import { TableSelectColumnsModalModal } from "./Modal";

import { TableContext } from "../Table/context";

import "./index.less";

export interface TableSelectColumnsModalProps {
  locale?: {
    apply: string;
    checkAll: string;
    openButton: string;
    headerModal: string;
  };
  onSubmit?: () => void;
  withSearch?: boolean;
  fetchAfterApply?: (selected: string[], row: any) => boolean | boolean;
  filterSelectedColumns?: (selected: string[]) => string[];
}

const TableSelectColumnsModal: React.FC<TableSelectColumnsModalProps> = props => {
  const { tableState, baseTableState } = useContext(TableContext);

  const treeData = useMemo(() => {
    const fixedColumnsKeys = tableState.columns
      .filter(column => column.fixed)
      .map(column => column.key);

    return (function rec(columns, parent) {
      return columns.map(column => ({
        key: column.key,
        parentKey: parent && parent.key,
        title: column.title,
        disabled: fixedColumnsKeys.includes(column.key),
        children: column.children && rec(column.children, column)
      }));
    })(baseTableState.columns);
  }, [baseTableState.columns, tableState.columns]);

  return <TableSelectColumnsModalModal {...props} treeData={treeData} />;
};

TableSelectColumnsModal.defaultProps = {
  locale: {
    apply: "SUBMIT",
    checkAll: "ALL",
    openButton: "COLUMNS",
    headerModal: "SELECT_COLUMNS"
  },
  withSearch: true
};

export default TableSelectColumnsModal;
