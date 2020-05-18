import * as React from "react";

import clsx from "clsx";
import { useState, useCallback, useMemo } from "react";

import { IColumn } from "./types";
import { PropsWithChildren } from "react";

export interface ColumnProps
  extends PropsWithChildren<any>,
    React.HTMLAttributes<any> {
  size: string;
  level: number;
  model: IColumn;
  multipleSorting: boolean;
}

// TODO убрать хардкод
function getColumnTopPos(level: number, size: string) {
  const columnHeightMap = {
    "small": 39,
    "middle": 47,
    "large": 55
  };

  return columnHeightMap[size] * (level - 1);
}

const Column: React.FC<ColumnProps> = props => {
  const {
    model,
    onClick,
    style,
    level,
    size,
    children,
    multipleSorting,
    ...restProps
  } = props;
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

  const styles = useMemo(
    () => ({
      ...style,
      top: getColumnTopPos(level, size),
      width: model.width || style.width
    }),
    [style, model.width, level, size]
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
  }, [model.resizable, model.fixed, restProps.className]);

  const sortSeq = useMemo(() => {
    return typeof model.sorter === "object" && model.sorter.multiple;
  }, [model.sorter]);

  return (
    <th
      {...restProps}
      style={styles}
      className={className}
      title={String(model.title)}
      onClick={onClickHandler}
      onMouseDown={onMouseDownHandler}
    >
      <div className="dw-table__column-content">
        {children}
        {sortSeq > 0 && (
          <span className="dw-table__column-sort-sequence">{sortSeq}</span>
        )}
      </div>
    </th>
  );
};

export default Column;
