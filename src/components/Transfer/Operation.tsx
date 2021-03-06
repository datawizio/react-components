import * as React from "react";
import LeftOutlined from "@ant-design/icons/LeftOutlined";
import DoubleLeftOutlined from "@ant-design/icons/DoubleLeftOutlined";
import RightOutlined from "@ant-design/icons/RightOutlined";
import DoubleRightOutlined from "@ant-design/icons/DoubleRightOutlined";
import Button from "../Button";
import { useContext } from "react";
import ConfigContext from "../ConfigProvider/context";

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
  tooltips?: { throwAll: string; throwChosen: string };
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
  tooltips
}: TransferOperationProps) => {
  const { translate, direction } = useContext(ConfigContext);
  return (
    <div className={className} style={style}>
      <Button
        type="primary"
        size="small"
        disabled={disabled || !rightActive}
        onClick={moveAllToRight}
        title={tooltips ? translate(tooltips.throwAll) : ""}
        icon={
          direction !== "rtl" ? <DoubleRightOutlined /> : <DoubleLeftOutlined />
        }
      />
      <Button
        type="primary"
        size="small"
        disabled={disabled || !rightActive}
        onClick={moveToRight}
        title={tooltips ? translate(tooltips.throwChosen) : ""}
        icon={direction !== "rtl" ? <RightOutlined /> : <LeftOutlined />}
      />
      <Button
        type="primary"
        size="small"
        disabled={disabled || !leftActive}
        onClick={moveToLeft}
        title={tooltips ? translate(tooltips.throwChosen) : ""}
        icon={direction !== "rtl" ? <LeftOutlined /> : <RightOutlined />}
      />
      <Button
        type="primary"
        size="small"
        disabled={disabled || !leftActive}
        onClick={moveAllToLeft}
        title={tooltips ? translate(tooltips.throwAll) : ""}
        icon={
          direction !== "rtl" ? <DoubleLeftOutlined /> : <DoubleRightOutlined />
        }
      />
    </div>
  );
};

export default Operation;
