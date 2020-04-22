import React from "react";

import { Input as AntInput } from "antd";
import { InputProps as AntInputProps } from "antd/lib/input";

import "./index.less";

export interface InputProps extends AntInputProps {}

const Input: React.FC<InputProps> = props => {
  return <AntInput {...props} />;
};

export default Input;
