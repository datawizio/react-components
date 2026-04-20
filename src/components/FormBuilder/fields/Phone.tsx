import React, { useMemo, useContext } from "react";
import PhoneInput from "../../PhoneInput";
import ConfigContext from "../../ConfigProvider/context";

import { Form } from "antd";
import { FieldPhoneProps } from "../types";

import type { RuleObject } from "antd/es/form";

const phoneValidation = (message: string) => ({
  message,
  validator(rule: RuleObject, value: string) {
    if (!value || PhoneInput.isValidPhoneNumber(value)) {
      return Promise.resolve();
    }
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
  const { translate } = useContext(ConfigContext);

  const internalRules = useMemo(() => {
    const validation = phoneValidation(
      translate("PHONE_NUMBER_VALIDATION_MESSAGE")
    );
    return rules ? rules.concat([validation]) : [validation];
  }, [rules, translate]);

  const handleChange = (value: string) => {
    onChange?.({ name, value });
  };

  return (
    <Form.Item name={name} label={label} rules={internalRules}>
      <PhoneInput placeholder={placeholder} onChange={handleChange} />
    </Form.Item>
  );
};
