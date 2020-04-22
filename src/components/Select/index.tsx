import React from "react";

import { Select as AntSelect } from "antd";
import { SelectProps as AntSelectProps, SelectValue } from "antd/lib/select";

import "./index.less";

export interface SelectProps<VT> extends AntSelectProps<VT> {}

const Select: React.FC<SelectProps<SelectValue>> = props => {
  return <AntSelect {...props} />;
};

export default Select;

export const Option = AntSelect.Option;
export const OptGroup = AntSelect.OptGroup;
