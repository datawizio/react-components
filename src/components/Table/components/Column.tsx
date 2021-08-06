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
  onWidthChange: (columnKey: string, width: number) => void;
}

const Column: React.FC<ColumnProps> = props => {
  const {
    model,
    onClick,
    multipleSorting,
    level,
    onWidthChange,
    ...restProps
  } = props;
  const [lastWidth, setLastWidth] = useState<number>(0);
  const columnRef = React.useRef(null);

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

  React.useEffect(() => {
    if (!onWidthChange) return;
    window.addEventListener("mouseup", onMouseUpHandler);
    return () => {
      window.removeEventListener("mouseup", onMouseUpHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMouseUpHandler = useCallback(() => {
    if (columnRef?.current && onWidthChange) {
      const colKey = model.originalKey ? model.originalKey : model.key;
      //@ts-ignore
      onWidthChange(colKey, columnRef.current?.offsetWidth);
    }
  }, [model.originalKey, model.key, onWidthChange]);

  const onMouseDownHandler = useCallback(
    event => {
      if (onWidthChange) {
        columnRef.current = event.target;
      }
      setLastWidth(event.target.offsetWidth);
    },
    [onWidthChange]
  );

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
    const defaultSubCellWidth = 20;
    const defaultMaxValue = 10;

    if (model.colWidth) {
      return {
        width: model.colWidth
      };
    }

    if (model.children && model.children.length) {
      return {
        width: model.children.length * defaultWidth + "px"
      };
    }

    // if BarTable columns
    if (model.max_value === 0 || model.max_value < defaultMaxValue) {
      model.max_value = defaultMaxValue;
    }

    if (model.max_value) {
      return {
        width: model.max_value * defaultSubCellWidth + "px"
      };
    }

    return {};
  }, [model.children, model.max_value, model.colWidth]);
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
