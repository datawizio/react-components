import * as React from "react";

const Cell: React.FC = props => {
  const { children, ...restProps } = props;
  return (
    <td {...restProps}>
      <div className="dw-table__cell">{children}</div>
    </td>
  );
};

export default Cell;
