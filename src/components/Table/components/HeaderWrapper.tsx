import React, { useContext } from "react";
import { TableContext } from "../context";

export const HeaderWrapper = ({ className, children }) => {
  const {
    tableState: { dataSource }
  } = useContext(TableContext);

  return dataSource.length === 0 ? null : (
    <thead className={className}>{children}</thead>
  );
};
