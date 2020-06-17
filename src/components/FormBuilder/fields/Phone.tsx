import React, { useMemo } from "react";

import { Form } from "antd";

import { FieldPhoneProps } from "../types";
import { Rule } from "antd/lib/form";
import PhoneInput from "../../PhoneInput";

const phoneValidation = () => ({
  validator(rule: Rule, value: string) {
    if (PhoneInput.isValidPhoneNumber(value)) {
      return Promise.resolve();
    }
    //@ts-ignore
    return Promise.reject(rule.message);
  }
});

export const FieldPhone: React.FC<FieldPhoneProps> = ({
  label,
  rules,
  name,
  placeholder,
  onChange
}) => {
  const internalRules = useMemo(() => {
    return rules ? rules.concat([phoneValidation]) : [phoneValidation];
  }, [rules]);

  const handleChange = (value: string) => {
    onChange({ name, value });
  };

  return (
    <Form.Item name={name} label={label} rules={internalRules}>
      <PhoneInput placeholder={placeholder} onChange={handleChange} />
    </Form.Item>
  );
};
