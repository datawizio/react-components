import * as React from "react";
import { TableContext } from "../context";

import clsx from "clsx";
import { useDrag, useDrop } from "react-dnd";
import { useState, useCallback, useMemo, useContext } from "react";

import { IColumn } from "../types";
import { PropsWithChildren } from "react";

export interface ColumnProps
  extends PropsWithChildren<any>,
    React.HTMLAttributes<any> {
  level: number;
  model: IColumn;
}

const Column: React.FC<ColumnProps> = props => {
  const { model, onClick, multipleSorting, level, ...restProps } = props;
  const [lastWidth, setLastWidth] = useState<number>(0);

  const { dispatch } = useContext(TableContext);

  const [, dragRef] = useDrag({
    item: { type: "column", key: model.key, level }
  });

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: "column",
    drop: (droppedItem: any) => {
      dispatch({
        type: "swapColumns",
        payload: [droppedItem.key, model.key]
      });
    },
    canDrop: droppedItem => {
      return droppedItem.level === level && droppedItem.key !== model.key;
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  const dndRef = useCallback(
    ref => {
      if (!model.fixed) {
        dragRef(ref);
        dropRef(ref);
      }
    },
    [model.fixed, dragRef, dropRef]
  );

  const onMouseDownHandler = useCallback(event => {
    setLastWidth(event.target.offsetWidth);
  }, []);

  const onClickHandler = useCallback(
    event => {
      const currentWidth = event.target.offsetWidth;
      lastWidth === currentWidth && onClick && onClick(event);
    },
    [lastWidth, onClick]
  );

  const className = useMemo(() => {
    return clsx(
      "dw-table__column",
      {
        "dw-table__column--resizable": model.resizable,
        "dw-table__column--fixed": Boolean(model.fixed),
        "dw-table__column--drop-hover": isOver && canDrop,

        "dw-table__column--fixed-left": model.fixed === "left",
        "dw-table__column--fixed-right": model.fixed === "right"
      },
      restProps.className
    );
  }, [model.fixed, model.resizable, restProps.className, isOver, canDrop]);

  const styles: object = useMemo((): object => {
    const defaultWidth = 200;

    if (model.children && model.children.length) {
      return {
        width: model.children.length * defaultWidth + "px"
      };
    }

    return {};
  }, [model.children]);

  return (
    <th
      {...restProps}
      ref={dndRef}
      className={className}
      onClick={onClickHandler}
      title={String(model.title)}
      onMouseDown={onMouseDownHandler}
      style={{ ...styles, ...props.style }}
    />
  );
};

export default Column;
