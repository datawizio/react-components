import React, { useMemo, useContext } from "react";

import { Form } from "antd";
import PhoneInput from "../../PhoneInput";

import { FieldPhoneProps } from "../types";
import { Rule } from "antd/lib/form";
import ConfigContext from "../../ConfigProvider/context";

const phoneValidation = (message: string) => ({
  message,
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
  const { translate } = useContext(ConfigContext);

  const internalRules = useMemo(() => {
    const validation = phoneValidation(
      translate("PHONE_NUMBER_VALIDATION_MESSAGE")
    );
    return rules ? rules.concat([validation]) : [validation];
  }, [rules, translate]);

  const handleChange = (value: string) => {
    onChange({ name, value });
  };

  return (
    <Form.Item name={name} label={label} rules={internalRules}>
      <PhoneInput placeholder={placeholder} onChange={handleChange} />
    </Form.Item>
  );
};
