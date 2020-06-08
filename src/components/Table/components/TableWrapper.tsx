import * as React from "react";

const TableWrapper: React.FC<React.HTMLAttributes<any>> = props => {
  const { style, ...tableProps } = props;
  const { height, width, ...tableStyles } = style;

  return (
    <div className="dw-table__wrapper" style={{ height, width }}>
      <table {...tableProps} style={tableStyles} />
    </div>
  );
};

export default TableWrapper;
