import React, { LegacyRef } from "react";

import { Input as AntInput } from "antd";
import { InputProps as AntInputProps, GroupProps } from "antd/lib/input";

import "./index.less";

export interface InputProps extends AntInputProps {}

export interface FCInput extends React.FC<InputProps> {
  Group: React.StatelessComponent<GroupProps>;
}

//@ts-ignore
const Input: FCInput = React.forwardRef((props, ref: LegacyRef<AntInput>) => {
  return <AntInput ref={ref} {...props} />;
});

Input.Group = AntInput.Group;

export default Input;
