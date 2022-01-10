import * as React from "react";
import { TableContext } from "../context";

import clsx from "clsx";
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { useState, useCallback, useMemo, useContext } from "react";
import { useDebouncedCallback } from "use-debounce/lib";

import { IColumn } from "../types";
import { PropsWithChildren } from "react";
import { isSafari } from "../../../utils/navigatorInfo";

export interface ColumnProps
  extends PropsWithChildren<any>,
    React.HTMLAttributes<any> {
  level: number;
  model: IColumn;
  virtual?: boolean;
  isHeader?: boolean;
  onWidthChange: (columnKey: string, width: number) => void;
}

const Column: React.FC<ColumnProps> = props => {
  const {
    model,
    onClick,
    multipleSorting,
    level,
    onWidthChange,
    virtual,
    isHeader,
    ...restProps
  } = props;
  const isSafariBrowser = isSafari();
  const [lastWidth, setLastWidth] = useState<number>(0);
  const startedResize = React.useRef(false);
  const columnRef = React.useRef(null);
  const lastWidthRef = React.useRef(0);

  const {
    dispatch,
    tableState: { columnsWidth, columnsForceUpdate }
  } = useContext(TableContext);

  const columnsWidthPreset = columnsWidth[model.key];
  const [, dragRef] = useDrag({
    item: { type: "column", key: model.key, level },
    canDrag: !model.fixed
  });

  const autoScroll = (step = 50) => {
    return (_: void, m: DropTargetMonitor) => {
      const SLOW_SCROLL_BREAKPOINT = 60;
      const FAST_SCROLL_BREAKPOINT = 25;

      const scrollTable = (node: HTMLElement, left: number) => {
        node.scroll({
          left,
          behavior: "smooth"
        });
      };

      if (virtual) {
        const tableHeaderDOMWrapper = columnRef.current.closest(
          ".dw-table--virtual .ant-table-header"
        );
        const tableWrapper = tableHeaderDOMWrapper?.parentElement;

        const tableBodyDOMWrapper = tableWrapper?.querySelector(
          ".ant-table-body"
        );

        if (!tableBodyDOMWrapper && !tableHeaderDOMWrapper) return;

        const cursor = m.getClientOffset();
        const rectHeader = tableHeaderDOMWrapper.getBoundingClientRect();

        if (cursor.x - rectHeader.left < FAST_SCROLL_BREAKPOINT) {
          scrollTable(
            tableBodyDOMWrapper,
            tableBodyDOMWrapper.scrollLeft - step * 3
          );
          return;
        }
        if (rectHeader.right - cursor.x < FAST_SCROLL_BREAKPOINT) {
          scrollTable(
            tableBodyDOMWrapper,
            tableBodyDOMWrapper.scrollLeft + step * 3
          );
          return;
        }

        if (cursor.x - rectHeader.left < SLOW_SCROLL_BREAKPOINT) {
          scrollTable(
            tableBodyDOMWrapper,
            tableBodyDOMWrapper.scrollLeft - step
          );
          return;
        }
        if (rectHeader.right - cursor.x < SLOW_SCROLL_BREAKPOINT) {
          scrollTable(
            tableBodyDOMWrapper,
            tableBodyDOMWrapper.scrollLeft + step
          );
          return;
        }
      }

      const tableDOMWrapper = columnRef.current.closest(
        ".ant-table-content>.dw-table__wrapper"
      );

      if (tableDOMWrapper && isSafariBrowser) {
        const cursor = m.getClientOffset();
        const rect = tableDOMWrapper.getBoundingClientRect();

        if (cursor.x - rect.left < SLOW_SCROLL_BREAKPOINT) {
          scrollTable(tableDOMWrapper, tableDOMWrapper.scrollLeft - step);
        }

        if (rect.right - cursor.x < SLOW_SCROLL_BREAKPOINT) {
          scrollTable(tableDOMWrapper, tableDOMWrapper.scrollLeft + step);
        }
      }
    };
  };

  const [autoScrollDebounced] = useDebouncedCallback(
    (_: void, m: DropTargetMonitor) => {
      autoScroll()(_, m);
    },
    150
  );

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: "column",
    drop: (droppedItem: any) => {
      dispatch({
        type: "swapColumns",
        payload: [droppedItem.key, model.key]
      });
    },
    canDrop: droppedItem => {
      return (
        droppedItem.level === level &&
        droppedItem.key !== model.key &&
        !model.fixed
      );
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    hover: autoScrollDebounced
  });

  const dndRef = useCallback(
    ref => {
      columnRef.current = ref;
      dragRef(ref);
      dropRef(ref);
    },
    [dragRef, dropRef]
  );

  React.useEffect(() => {
    if (!onWidthChange) return;
    window.addEventListener("mouseup", onMouseUpHandler);
    return () => {
      window.removeEventListener("mouseup", onMouseUpHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (!isHeader) return;
    const colKey = model.originalKey ? model.originalKey : model.key;
    // if (model.resizable) return ;
    const sortersEl = columnRef.current.getElementsByClassName(
      "ant-table-column-sorters"
    );
    if (sortersEl.length > 0) {
      sortersEl[0].style["min-width"] = "0%";
      setTimeout(() => {
        sortersEl[0].style["min-width"] = "100%";
      }, 1000);
      //
    }
    const fn = () => {
      if (
        columnRef?.current &&
        lastWidthRef.current !== columnRef.current?.offsetWidth
      ) {
        lastWidthRef.current = columnRef.current?.offsetWidth;

        dispatch({
          type: "columnWidthChange",
          payload: {
            key: colKey as string,
            width: columnRef.current?.offsetWidth
          }
        });
      }
    };
    fn();
    const interval = setInterval(fn, 1000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHeader]);

  const onMouseUpHandler = useCallback(() => {
    if (startedResize?.current) {
      const colKey = model.originalKey ? model.originalKey : model.key;
      //@ts-ignore
      onWidthChange(colKey, columnRef.current?.offsetWidth);

      startedResize.current = false;
    }
  }, [model.originalKey, model.key, onWidthChange]);

  const onMouseDownHandler = useCallback(
    event => {
      if (onWidthChange) {
        startedResize.current = true;
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

    if (columnsWidthPreset) {
      return { width: columnsWidthPreset };
    }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model.children, model.max_value, model.colWidth, columnsForceUpdate]);

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
