import React from "react";

import { Button as AntButton } from "antd";
import { ButtonProps as AntButtonProps } from "antd/lib/button";

import "./index.less";

export interface ButtonProps extends AntButtonProps {}

const Button: React.FC<ButtonProps> = props => {
  return <AntButton {...props} />;
};

export default Button;
