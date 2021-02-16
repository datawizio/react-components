import * as React from "react";
import { useRef, useState, useEffect, useMemo, useContext } from "react";
import resizeDetector from "../../../utils/resizeDetector";
import { getAbsoluteHeight } from "../../../utils/sizeUtils";
import { TableContext } from "../context";

const TableWrapper: React.FC<React.HTMLAttributes<any>> = props => {
  const resizeRef = useRef<() => void>();
  const wrapperRef = useRef<HTMLDivElement>();

  const { style, ...tableProps } = props;
  const { height: _height, width: _width, ...tableStyles } = style;

  const {
    tableState: { dataSource },
    tableProps: { responsiveTable, autoHeight }
  } = useContext(TableContext);

  const [width, setWidth] = useState<any>(_width);
  const [height, setHeight] = useState<any>(_height);

  useEffect(() => setWidth(_width), [_width]);
  useEffect(() => setHeight(_height), [_height]);

  useEffect(() => {
    if (wrapperRef.current && responsiveTable && dataSource.length) {
      const container = wrapperRef.current.closest(".dw-table-container");

      if (container && container.parentElement) {
        const parent = container.parentElement;
        const pagination = container.getElementsByClassName(
          "ant-pagination"
        )[0];

        const toolbar = container.getElementsByClassName(
          "dw-table__toolbar"
        )[0];

        resizeRef.current && resizeRef.current();

        resizeRef.current = resizeDetector(parent, (elHeight, elWidth) => {
          const offset = [toolbar, pagination].reduce((acc, el) => {
            return el ? acc + getAbsoluteHeight(el as any) : acc;
          }, 0);

          setWidth(elWidth);
          setHeight(elHeight - offset);
        });

        return resizeRef.current;
      }
    }
  }, [responsiveTable, wrapperRef, dataSource]);

  const styles = useMemo(() => {
    const _styles: React.CSSProperties = {
      width
    };

    if (autoHeight) _styles.maxHeight = height;
    else _styles.height = height;

    return _styles;
  }, [height, width, autoHeight]);

  return (
    <div style={styles} ref={wrapperRef} className="dw-table__wrapper">
      <table {...tableProps} style={tableStyles} />
    </div>
  );
};

export default TableWrapper;
