import React from "react";

import { Radio as AntRadio } from "antd";
import RadioGroup from "./Group";

import { FCRadio } from "./types";

import "./index.less";

const Radio: FCRadio = props => {
  return <AntRadio {...props} />;
};

Radio.Group = RadioGroup;

export default Radio;
