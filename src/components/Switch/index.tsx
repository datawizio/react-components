import React, { FC } from "react";
import {
  Switch as AntSwitch,
  SwitchProps as AntSwitchProps,
  Typography
} from "antd";

import "./index.less";

interface SwitchProps extends AntSwitchProps {
  placeholder?: string;
}

const Switch: FC<SwitchProps> = ({ placeholder, ...restProps }) => {
  return (
    <div className="dw-switch__container">
      {placeholder && (
        <Typography.Text className="dw-switch__container--placeholder">
          {placeholder}
        </Typography.Text>
      )}
      <AntSwitch {...restProps} />
    </div>
  );
};

export default Switch;
