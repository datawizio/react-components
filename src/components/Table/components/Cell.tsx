import * as React from "react";
import { TableContext } from "../context";

const Cell: React.FC = props => {
  const { children, ...restProps } = props;
  const {
    tableState: { columnsWidth }
  } = React.useContext(TableContext);

  const style = React.useMemo(() => {
    const output: React.CSSProperties = {};

    const column = children[1]?.props.column;
    const columnKey = column ? column.key : "";

    if (columnKey) {
      output.width = `${columnsWidth[columnKey]}px`;
      return output;
    }
  }, [children, columnsWidth]);

  return (
    <td {...restProps} style={style}>
      <div className="dw-table__cell">{children}</div>
    </td>
  );
};

export default Cell;
