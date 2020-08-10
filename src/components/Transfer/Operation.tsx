import * as React from "react";
import LeftOutlined from "@ant-design/icons/LeftOutlined";
import DoubleLeftOutlined from "@ant-design/icons/DoubleLeftOutlined";
import RightOutlined from "@ant-design/icons/RightOutlined";
import DoubleRightOutlined from "@ant-design/icons/DoubleRightOutlined";
import Button from "../Button";

export interface TransferOperationProps {
  className?: string;
  moveToLeft?: React.MouseEventHandler<HTMLButtonElement>;
  moveAllToLeft?: React.MouseEventHandler<HTMLButtonElement>;
  moveToRight?: React.MouseEventHandler<HTMLButtonElement>;
  moveAllToRight?: React.MouseEventHandler<HTMLButtonElement>;
  leftActive?: boolean;
  rightActive?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  direction?: "ltr" | "rtl";
}

const Operation = ({
  disabled,
  moveToLeft,
  moveAllToLeft,
  moveToRight,
  moveAllToRight,
  leftActive,
  rightActive,
  className,
  style,
  direction
}: TransferOperationProps) => (
  <div className={className} style={style}>
    <Button
      type="primary"
      size="small"
      disabled={disabled || !rightActive}
      onClick={moveAllToRight}
      icon={
        direction !== "rtl" ? <DoubleRightOutlined /> : <DoubleLeftOutlined />
      }
    />
    <Button
      type="primary"
      size="small"
      disabled={disabled || !rightActive}
      onClick={moveToRight}
      icon={direction !== "rtl" ? <RightOutlined /> : <LeftOutlined />}
    />
    <Button
      type="primary"
      size="small"
      disabled={disabled || !leftActive}
      onClick={moveToLeft}
      icon={direction !== "rtl" ? <LeftOutlined /> : <RightOutlined />}
    />
    <Button
      type="primary"
      size="small"
      disabled={disabled || !leftActive}
      onClick={moveAllToLeft}
      icon={
        direction !== "rtl" ? <DoubleLeftOutlined /> : <DoubleRightOutlined />
      }
    />
  </div>
);

export default Operation;
