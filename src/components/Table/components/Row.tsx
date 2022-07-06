import clsx from "clsx";
import * as React from "react";

interface RowProps {
  isTotalRow?: (rowKey: string) => boolean;
  className?: string;
}

const Row: React.FC<RowProps> = props => {
  const { children, isTotalRow, className, ...restProps } = props;
  const cssClass = clsx(className, {
    "dw-row-total": isTotalRow ? isTotalRow(restProps["data-row-key"]) : false
  });
  return (
    <tr className={cssClass} {...restProps}>
      {children}
    </tr>
  );
};

export default Row;
