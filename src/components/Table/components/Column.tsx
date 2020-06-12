import * as React from "react";

import clsx from "clsx";
import { useState, useCallback, useMemo } from "react";

import { IColumn } from "../types";
import { PropsWithChildren } from "react";

export interface ColumnProps
  extends PropsWithChildren<any>,
    React.HTMLAttributes<any> {
  model: IColumn;
}

const Column: React.FC<ColumnProps> = props => {
  const { model, onClick, multipleSorting, ...restProps } = props;

  const [lastWidth, setLastWidth] = useState<number>(0);

  const onMouseDownHandler = useCallback(event => {
    setLastWidth(event.target.offsetWidth);
  }, []);

  const onClickHandler = useCallback(
    event => {
      const currentWidth = event.target.offsetWidth;
      lastWidth === currentWidth && onClick(event);
    },
    [lastWidth, onClick]
  );

  const className = useMemo(() => {
    return clsx(
      "dw-table__column",
      {
        "dw-table__column--resizable": model.resizable,
        "dw-table__column--fixed": Boolean(model.fixed),

        "dw-table__column--fixed-left": model.fixed === "left",
        "dw-table__column--fixed-right": model.fixed === "right"
      },
      restProps.className
    );
  }, [model.fixed, model.resizable, restProps.className]);

  return (
    <th
      {...restProps}
      className={className}
      title={String(model.title)}
      onClick={onClickHandler}
      onMouseDown={onMouseDownHandler}
    />
  );
};

export default Column;
