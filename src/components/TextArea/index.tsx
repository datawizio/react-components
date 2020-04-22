import React from "react";

import { Input } from "antd";
import { TextAreaProps as AntTextAreaProps } from "antd/lib/input";

import "./index.less";

export interface TextAreaProps extends AntTextAreaProps {}

const TextArea: React.FC<TextAreaProps> = props => {
  return <Input.TextArea {...props} />;
};

export default TextArea;
