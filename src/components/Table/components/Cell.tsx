import * as React from "react";
import { TableContext } from "../context";

const Cell: React.FC = props => {
  const { children, ...restProps } = props;
  const {
    tableState: { columnsWidth }
  } = React.useContext(TableContext);

  const style = React.useMemo(() => {
    if (children[1].props.row && children[1].props.row.firstRow) {
      const columnKey = children[1].props.column
        ? children[1].props.column.key
        : "";
      return { width: `${columnsWidth[columnKey]}px` };
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
