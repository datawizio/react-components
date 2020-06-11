import clsx from "clsx";
import * as React from "react";
import { TableContext } from "../context";
import { useContext, useMemo } from "react";

import "../index.less";

const ToolBar: React.FC = props => {
  const [tableState, , tableProps] = useContext(TableContext);

  const className = useMemo(
    () =>
      clsx("dw-table__toolbar", {
        "dw-table__toolbar--loading": tableProps.loading || tableState.loading
      }),
    [tableProps.loading, tableState.loading]
  );

  return <div className={className}>{props.children}</div>;
};

export default ToolBar;
