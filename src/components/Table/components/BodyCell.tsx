import * as React from "react";
import { useMemo } from "react";
import { DTypeConfig, TableProps, IRow, IColumn } from "../types";

export interface BodyCellProps<T = any> {
  value: T;
  row: IRow;
  index: number;
  column: IColumn;
  typeConfig: DTypeConfig<T>;
  renderProps: TableProps["cellRenderProps"];
}

const BodyCell: React.FC<BodyCellProps> = React.memo(props => {
  const { typeConfig, value, row, column, index, renderProps } = props;
  return useMemo(() => {
    return typeConfig && typeConfig.render
      ? typeConfig.render(value, row, column, index, renderProps)
      : value;
  }, [typeConfig, value, index, renderProps, column, row]);
});

export default BodyCell;
