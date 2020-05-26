import React from "react";
import ReactPhoneInput, {
  PhoneInputProps as ReactPhoneInputProps,
  isValidPhoneNumber
} from "react-phone-number-input";

import "./index.less";

export interface PhoneInputProps extends ReactPhoneInputProps {}

export interface FCPhoneInput extends React.FC<PhoneInputProps> {
  /**
   * PhoneNumber validation
   */
  isValidPhoneNumber: (value?: string) => boolean;
}

const PhoneInput: FCPhoneInput = ({ value, onChange, ...restProps }) => {
  value = value ? value : "";
  onChange = onChange ? onChange : () => {};
  return <ReactPhoneInput {...restProps} value={value} onChange={onChange} />;
};

PhoneInput.isValidPhoneNumber = isValidPhoneNumber;

export default PhoneInput;
