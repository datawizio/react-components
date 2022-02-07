import React, { useContext, useEffect, useMemo } from "react";
import { ScrollContext, vidMap } from ".";

export function VWrapper(props: any): JSX.Element {
  const { children, ...restProps } = props;
  const { renderLen, start, dispatch, totalLen, vid } = useContext(
    ScrollContext
  );

  const contents = useMemo(() => children[1], [children]);

  useEffect(() => {
    if (totalLen !== contents?.length && totalLen) {
      dispatch({
        type: "changeTotalLen",
        totalLen: contents?.length ?? 0
      });

      if (vidMap.has(vid)) {
        vidMap.set(vid, {
          ...vidMap.get(vid),
          notRefresh: true
        });
      }
    }
  }, [totalLen, contents, dispatch, vid]);

  let tempNode = null;
  if (Array.isArray(contents) && contents.length) {
    tempNode = [
      children[0],
      contents.slice(start, start + renderLen).map(item => {
        if (Array.isArray(item)) {
          // 兼容antd v4.3.5 --- rc-table 7.8.1及以下
          return item[0];
        }
        // 处理antd ^v4.4.0  --- rc-table ^7.8.2
        return item;
      })
    ];
    tempNode[1][0] = React.cloneElement(tempNode[1][0], {
      record: { ...tempNode[1][0].props.record, firstRow: true }
    });
  } else {
    tempNode = children;
  }

  return <tbody {...restProps}>{tempNode}</tbody>;
}
