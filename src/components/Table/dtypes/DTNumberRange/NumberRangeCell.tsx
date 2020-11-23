import * as React from "react";
import { useMemo } from "react";
import {
  IColumn,
  IRow,
} from "../../types";
import "./styles.less";

const NumberRangeCell: React.FC<{
  cellVal: number;
  column: IColumn;
  row: IRow;
}> = ({ cellVal, column, row }) => {
  const min = 0;
  const defaultMax = 10;

  const max = useMemo(() => {
    return cellVal >= defaultMax ? cellVal : defaultMax;
  }, [cellVal]);

  return (
    <div className={"number-range-cell"}>
      <span>{min}</span>
      <span>{max}</span>
    </div>
  );
};

export default NumberRangeCell;
