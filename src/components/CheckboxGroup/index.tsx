import React from "react";

import { Checkbox } from "antd";
import { CheckboxGroupProps as AntCheckboxGroupProps } from "antd/lib/checkbox";

import "./index.less";

export interface CheckboxGroupProps extends AntCheckboxGroupProps {}

const CheckboxGroup: React.FC<CheckboxGroupProps> = props => {
  return <Checkbox.Group {...props} />;
};

export default CheckboxGroup;
