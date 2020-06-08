import * as React from "react";
import { useMemo } from "react";
import { DTypeConfig, TableProps } from "../types";

export interface BodyCellProps<T = any> {
  value: T;
  index: number;
  typeConfig: DTypeConfig<T>;
  renderProps: TableProps["cellRenderProps"];
}

const BodyCell: React.FC<BodyCellProps> = React.memo(props => {
  const { typeConfig, value, index, renderProps } = props;
  return useMemo(() => {
    return typeConfig && typeConfig.render
      ? typeConfig.render(value, index, renderProps)
      : value;
  }, [typeConfig, value, index, renderProps]);
});

export default BodyCell;
