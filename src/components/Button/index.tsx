import React from "react";

import { Button as AntButton } from "antd";
import { ButtonProps as AntButtonProps } from "antd/lib/button";

import clsx from "clsx";

import "./index.less";

export interface ButtonProps extends AntButtonProps {
  /** Отображать кнопку с границей или без */
  border?: boolean;
}

const Button: React.FC<ButtonProps> = ({ border, className, ...props }) => {
  return (
    <AntButton
      {...props}
      className={clsx(className, { "no-border": !border })}
    />
  );
};

Button.defaultProps = {
  border: true
};

export default Button;
