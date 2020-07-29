import React from "react";

import { Form } from "antd";
import { Field } from "./Field";

import { FormFieldProps } from "../../types";

export type EnableSelectValueType = {
  enabled: boolean;
  value: any;
};

export interface FieldEnableSelectProps
  extends FormFieldProps<EnableSelectValueType> {
  renderField: (value: EnableSelectValueType) => any;
}

export const FieldEnableSelect: React.FC<FieldEnableSelectProps> = ({
  label,
  rules,
  name,
  initialValue,
  placeholder,
  renderField,
  onChange,
  ...restProps
}) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      initialValue={initialValue}
      className="field-enable-select"
    >
      <Field
        name={name}
        renderField={renderField}
        placeholder={placeholder}
        onChange={onChange}
      />
    </Form.Item>
  );
};
