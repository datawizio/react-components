import React from "react";

import { ButtonProps } from "antd/lib/button";

import { Button as AntButton } from "antd";
import "./index.less";

interface IButton extends ButtonProps {}

export const Button: React.FC<IButton> = props => {
  return <AntButton {...props} />;
};
