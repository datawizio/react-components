import * as React from "react";
import { DTypeConfig } from "../../types";
import NumberRangeCell from "./NumberRangeCell";

export type NumberRangeType = {
  dtype: "number_range";
  value: number;
};

const DTNumberRange = {
  toString: (cellVal) => cellVal.value.toString(),
  render: (cellVal, row, column) => {
    return (
      <NumberRangeCell
        cellVal={cellVal.value}
        column={column}
        row={row}
      />
    );
  },
} as DTypeConfig<NumberRangeType>;

export default DTNumberRange;