import * as React from "react";
import { IRow, IColumn } from "../types";
import { TableContext } from "../context";
import { useMemo, useContext } from "react";
import { defineCellType } from "../utils/utils";

export interface CellDataProps<T = any> {
  value: T;
  row: IRow;
  column: IColumn;

  yIndex: number;
  xIndex: number;
  columnLevel: number;
}

const CellData: React.FC<CellDataProps> = React.memo(props => {
  const { value, row, column, xIndex, yIndex, columnLevel } = props;
  const [{ dTypesConfig }, , { cellRenderProps, rowPrefix }] = useContext(
    TableContext
  );

  const typeConfig = useMemo(() => {
    return dTypesConfig[defineCellType(value, column)];
  }, [dTypesConfig, value, column]);

  const cellDataRender = useMemo(() => {
    return typeConfig && typeConfig.render
      ? typeConfig.render(value, row, column, xIndex, cellRenderProps)
      : value;
  }, [typeConfig, value, xIndex, cellRenderProps, column, row]);

  const rowPrefixRender = useMemo(() => {
    return (
      rowPrefix &&
      yIndex === 0 &&
      columnLevel === 1 &&
      rowPrefix(value, row, column, xIndex)
    );
  }, [rowPrefix, value, xIndex, column, row, columnLevel, yIndex]);

  return (
    <>
      <span className="row-prefix">{rowPrefixRender}</span>
      {cellDataRender}
    </>
  );
});

export default CellData;
