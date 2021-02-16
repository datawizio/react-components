import * as React from "react";
import { DTypeConfig } from "../../types";
import BarCell from "./BarCell";

export type DTBarType = {
  dtype: "bar";
  value: number;
};

const DTBar = {
  tooltip: (cellVal, row, column) => null,
  toString: (cellVal) => cellVal.value.toString(),
  render: function (cellVal, row, column, xIndex) {
    return (
      <BarCell
        cellVal={cellVal.value}
        column={column}
        row={row}
        xIndex={xIndex}
        tooltip={this.tooltip(cellVal, row, column)}
      />
    );
  },
} as DTypeConfig<DTBarType>;

export default DTBar;
