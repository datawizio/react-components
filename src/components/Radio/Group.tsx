import React from "react";
import clsx from "clsx";

import { Radio } from "antd";

import { RadioGroupProps } from "./types";

const RadioGroup: React.FC<RadioGroupProps> = ({ vertical, ...restProps }) => {
  const className = clsx({ "ant-radio-group-vertical": vertical });
  return <Radio.Group {...restProps} className={className} />;
};

export default RadioGroup;
