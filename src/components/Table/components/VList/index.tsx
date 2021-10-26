/* eslint-disable arrow-body-style */
import React, {
  useRef,
  useEffect,
  useContext,
  createContext,
  useReducer,
  useState,
  useMemo
} from "react";
import { throttle, isNumber } from "lodash-es";

import "./style.css";
import { VWrapper } from "./Wrapper";
import Cell from "../Cell";
import { TableContext } from "../../context";

// ===============reducer ============== //
const initialState = {
  // 行高度
  rowHeight: 0,
  // 当前的scrollTop
  curScrollTop: 0,
  // 可滚动区域的高度
  scrollHeight: 0,
  // scrollY值
  tableScrollY: 0,
  // 总行数
  totalLen: 0
};

function reducer(state, action) {
  const {
    scrollHeight,
    curScrollTop,
    tableScrollY,
    rowHeight,
    totalLen,
    ifScrollTopClear
  } = action;

  let stateScrollTop = state.curScrollTop;

  switch (action.type) {
    // 改变trs 即 改变渲染的列表trs
    case "changeTrs":
      return {
        ...state,
        curScrollTop,
        scrollHeight,
        tableScrollY
      };
    // 初始化每行的高度, 表格总高度, 渲染的条数
    case "initHeight":
      return {
        ...state,
        rowHeight
      };
    // 更改totalLen
    case "changeTotalLen":
      if (totalLen === 0) {
        stateScrollTop = 0;
      }

      return {
        ...state,
        totalLen,
        curScrollTop: stateScrollTop
      };

    case "reset":
      return {
        ...state,
        curScrollTop: ifScrollTopClear ? 0 : state.curScrollTop,
        scrollHeight: 0
      };

    default:
      throw new Error();
  }
}

// ==============全局常量 ================== //
const DEFAULT_VID = "vtable";
export const vidMap = new Map();

// ===============context ============== //
export const ScrollContext = createContext({
  dispatch: undefined,
  renderLen: 1,
  start: 0,
  offsetStart: 0,
  // =============
  rowHeight: initialState.rowHeight,
  totalLen: 0,
  vid: DEFAULT_VID
});

// =============组件 =================== //

function VRow(props: any, ref: any): JSX.Element {
  const { dispatch, rowHeight, totalLen, vid } = useContext(ScrollContext);

  const { children, style, ...restProps } = props;

  const trRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    const initHeight = tempRef => {
      if (tempRef?.current?.offsetHeight && !rowHeight && totalLen) {
        const tempRowHeight = tempRef?.current?.offsetHeight ?? 0;
        vidMap.set(vid, {
          ...vidMap.get(vid),
          rowItemHeight: tempRowHeight
        });
        dispatch({
          type: "initHeight",
          rowHeight: tempRowHeight
        });
      }
    };

    initHeight(
      Object.prototype.hasOwnProperty.call(ref, "current") ? ref : trRef
    );
  }, [trRef, dispatch, rowHeight, totalLen, ref, vid]);

  return (
    <tr
      {...restProps}
      ref={Object.prototype.hasOwnProperty.call(ref, "current") ? ref : trRef}
      style={{
        ...style,
        // height: rowHeight || "auto",
        boxSizing: "border-box"
      }}
    >
      {children}
    </tr>
  );
}

const VTableHeaderCol: React.FC<{ colKey: string; width: number }> = React.memo(
  ({ colKey, width }) => {
    return (
      <th
        className="ant-table-cell"
        key={colKey}
        style={{ width: `${width}px` }}
      />
    );
  }
);

function VTable(props: any, otherParams): JSX.Element {
  const { style, children, ...rest } = props;
  const { width, ...rest_style } = style;
  const {
    tableState: { columns, columnsWidth }
  } = useContext(TableContext);
  const { vid, scrollY, reachEnd, onScroll } = otherParams ?? {};

  const [state, dispatch] = useReducer(reducer, initialState);

  const wrap_tableRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  // 数据的总条数
  const [totalLen, setTotalLen] = useState<number>(
    children[1]?.props?.data?.length ?? 0
  );

  const { firstRow, tableWidth } = useMemo(() => {
    if (!totalLen) return { firstRow: <></>, tableWidth: 0 };
    let tableWidth = 0;
    const firstRowColumns = [];

    function digColumns(columns, defaultWidth) {
      // let sum = 0;
      columns.forEach(column => {
        const colKey = column.originalKey ?? column.key;
        if (Array.isArray(column.children) && column.children.length > 0) {
          digColumns(column.children, 200);
          return;
        }

        const width = columnsWidth[colKey] ?? defaultWidth;
        tableWidth += width;
        firstRowColumns.push(
          <VTableHeaderCol key={colKey} colKey={colKey} width={width} />
        );
      });
    }
    digColumns(columns, 300);
    const firstRow = (
      <thead>
        <tr className="fake-first-row">{firstRowColumns}</tr>
      </thead>
    );
    return { firstRow, tableWidth };
  }, [totalLen, columns, columnsWidth]);

  useEffect(() => {
    if (state.totalLen) {
      setTotalLen(state.totalLen);
    }
  }, [state.totalLen]);

  useEffect(() => {
    return () => {
      vidMap.delete(vid);
    };
  }, [vid]);

  // 数据变更
  useEffect(() => {
    if (isNumber(children[1]?.props?.data?.length)) {
      setTotalLen(children[1]?.props?.data?.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children[1].props.data]);

  // table总高度
  const tableHeight = useMemo<string | number>(() => {
    let temp: string | number = "auto";
    if (state.rowHeight && totalLen) {
      temp = state.rowHeight * totalLen;
    }
    return temp;
  }, [state.rowHeight, totalLen]);

  // table的scrollY值
  let tableScrollY = 0;
  if (typeof scrollY === "string") {
    tableScrollY = (wrap_tableRef.current?.parentNode as HTMLElement)
      ?.offsetHeight;
  } else {
    tableScrollY = scrollY;
  }

  if (isNumber(tableHeight) && tableHeight < tableScrollY) {
    //@ts-ignore
    tableScrollY = tableHeight;
  }

  // 处理tableScrollY <= 0的情况
  if (tableScrollY <= 0) {
    tableScrollY = 0;
  }

  // 渲染的条数
  const renderLen = useMemo<number>(() => {
    let temp = 1;
    if (state.rowHeight && totalLen && tableScrollY) {
      if (tableScrollY <= 0) {
        temp = 0;
      } else {
        const tempRenderLen = ((tableScrollY / state.rowHeight) | 0) + 1 + 2;
        temp = tempRenderLen > totalLen ? totalLen : tempRenderLen;
      }
    }
    return temp;
  }, [state.rowHeight, totalLen, tableScrollY]);

  // 渲染中的第一条
  let start = state.rowHeight ? (state.curScrollTop / state.rowHeight) | 0 : 0;
  // 偏移量
  let offsetStart = state.rowHeight ? state.curScrollTop % state.rowHeight : 0;

  // 用来优化向上滚动出现的空白
  if (
    state.curScrollTop &&
    state.rowHeight &&
    state.curScrollTop > state.rowHeight
  ) {
    start -= 1;
    offsetStart += state.rowHeight;
  } else {
    start = 0;
  }

  useEffect(() => {
    const scrollNode = wrap_tableRef.current?.parentNode as HTMLElement;

    const obj = vidMap.get(vid) ?? {};
    // debugger;
    // if (!obj?.notRefresh) {
    //   // 滚动条滚到最上面
    //   if (!reachEnd) {
    //     if (scrollNode) {
    //       // scrollNode.scrollTop = 0;
    //     }

    //     dispatch({ type: "reset", ifScrollTopClear: true });
    //   } else {
    //     // 不清空curScrollTop
    //     dispatch({ type: "reset", ifScrollTopClear: false });
    //   }
    // }

    if (vidMap.has(vid)) {
      vidMap.set(vid, {
        ...obj,
        scrollNode,
        notRefresh: false
      });
    }
  }, [totalLen, reachEnd, vid]);

  useEffect(() => {
    const throttleScroll = throttle(e => {
      const scrollTop: number = e?.target?.scrollTop ?? 0;
      const scrollHeight: number = e?.target?.scrollHeight ?? 0;
      const clientHeight: number = e?.target?.clientHeight ?? 0;

      // 到底了 没有滚动条就不会触发reachEnd. 建议设置scrolly高度少点或者数据量多点.
      if (scrollTop === scrollHeight) {
        // reachEnd && reachEnd()
      } else if (scrollTop + clientHeight >= scrollHeight) {
        // 有滚动条的情况
        // eslint-disable-next-line no-unused-expressions
        // reachEnd && reachEnd();
      }
      // eslint-disable-next-line no-unused-expressions
      onScroll && onScroll();
      dispatch({
        type: "changeTrs",
        curScrollTop: scrollTop,
        scrollHeight,
        tableScrollY
      });
    }, 60);

    const ref = wrap_tableRef?.current?.parentNode as HTMLElement;

    if (ref) {
      ref.addEventListener("scroll", throttleScroll);
    }

    return () => {
      ref.removeEventListener("scroll", throttleScroll);
    };
  }, [wrap_tableRef, tableScrollY, onScroll, reachEnd]);

  return (
    <div
      className="virtuallist"
      ref={wrap_tableRef}
      style={{
        width: "100%",
        position: "relative",
        height: tableHeight,
        minHeight: scrollY - 10,
        boxSizing: "border-box",
        paddingTop: state.curScrollTop
      }}
    >
      <ScrollContext.Provider
        value={{
          dispatch,
          rowHeight: state.rowHeight,
          start,
          offsetStart,
          renderLen,
          totalLen,
          vid
        }}
      >
        <table
          {...rest}
          ref={tableRef}
          style={{
            // ...rest_style,
            width: tableWidth,
            position: "relative",
            transform: `translateY(-${offsetStart}px)`
          }}
        >
          {firstRow}
          {children}
        </table>
      </ScrollContext.Provider>
    </div>
  );
}

/**
 * put tempObj in vtable.
 * @param tempObj
 * @returns
 */
const transformTable = tempObj => props => VTable(props, tempObj);

// ================导出===================
export function VList(props: {
  height: number | string;
  onReachEnd?: () => void;
  onScroll?: () => void;
  vid?: string;
}): any {
  const _vid = props.vid ?? DEFAULT_VID;

  let TableComponent;

  if (vidMap.has(_vid) && vidMap.get(_vid).height === props.height) {
    TableComponent = vidMap.get(_vid)?.components;
  } else {
    TableComponent = transformTable({
      vid: _vid,
      scrollY: props.height,
      reachEnd: props.onReachEnd,
      onScroll: props.onScroll
    });
    vidMap.set(_vid, {
      components: TableComponent,
      height: props.height
    });
  }
  return {
    table: TableComponent,
    body: {
      wrapper: VWrapper,
      row: VRow,
      cell: Cell
    }
  };
}

export function scrollTo(option: {
  /**
   * 行数
   */
  row?: number;
  /**
   * y的偏移量
   */
  y?: number;
  /**
   * 同一页面拥有多个虚拟表格的时候的唯一标识.
   */
  vid?: string;
}) {
  const { row, y, vid = DEFAULT_VID } = option;

  const { scrollNode, rowItemHeight } = vidMap.get(vid);

  if (row) {
    if (row - 1 > 0) {
      scrollNode.scrollTop = (row - 1) * (rowItemHeight ?? 0);
    } else {
      scrollNode.scrollTop = 0;
    }
  } else {
    scrollNode.scrollTop = y ?? 0;
  }
}
