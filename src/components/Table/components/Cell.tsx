import * as React from "react";
import { TableContext } from "../context";

const Cell: React.FC = props => {
  const { children, ...restProps } = props;
  const {
    tableState: { columnsWidth }
  } = React.useContext(TableContext);

  const style = React.useMemo(() => {
    const output: any = {};

    const firstRow = children[1].props?.row?.firstRow;
    const column = children[1].props.column;
    const columnKey = column ? column.key : "";

    if (column?.fixed === "left" && column?.leftOffset) {
      output.left = `${column.leftOffset}px`;
    }

    if (firstRow) {
      if (columnKey) {
        output.width = `${columnsWidth[columnKey]}px`;
      }

      return output;
    }

    return {};
  }, [children, columnsWidth]);

  return (
    <td {...restProps} style={style}>
      <div className="dw-table__cell">{children}</div>
    </td>
  );
};

export default Cell;
