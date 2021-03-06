import React from "react";

import { Button as AntButton } from "antd";
import { ButtonProps as AntButtonProps } from "antd/lib/button";

import clsx from "clsx";

import "./index.less";

export interface ButtonProps extends AntButtonProps {
  /** Отображать кнопку с границей или без */
  border?: boolean;

  highlight?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  border,
  highlight,
  className,
  ...props
}) => {
  return (
    <AntButton
      {...props}
      className={clsx("dw-btn", className, {
        "no-border": !border,
        "highlight": highlight
      })}
    />
  );
};

Button.defaultProps = {
  border: true
};

export default Button;
