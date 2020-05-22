import React from "react";

import {
  RadioProps as AntRadioProps,
  RadioGroupProps as AntRadioGroupProps
} from "antd/lib/radio";

export interface RadioGroupProps extends AntRadioGroupProps {
  /**
   * show vertical options
   */
  vertical?: boolean;
}

export interface RadioProps extends AntRadioProps {}
export interface FCRadioProps extends React.FC<RadioProps> {}

export interface FCRadio extends FCRadioProps {
  Group: React.FC<RadioGroupProps>;
}
