import React from "react";

import { Checkbox as AntCheckbox } from "antd";
import { CheckboxProps as AntCheckboxProps } from "antd/lib/checkbox";

import "./index.less";

export interface CheckboxProps extends AntCheckboxProps {}

const Checkbox: React.FC<CheckboxProps> = props => {
  return <AntCheckbox {...props} />;
};

export default Checkbox;
