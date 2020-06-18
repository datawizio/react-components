import React, { useCallback } from "react";

import { Form } from "antd";
import Checkbox from "../../Checkbox";

import { FieldCheckboxProps } from "../types";

export const FieldCheckbox: React.FC<FieldCheckboxProps> = React.memo(
  ({ label, rules, name, placeholder, onChange }) => {
    const handleFieldChange = useCallback(
      () => ({
        target: { name, checked }
      }: React.ChangeEvent<HTMLInputElement>) => {
        onChange({
          name,
          value: checked
        });
      },
      [onChange]
    );

    return (
      <Form.Item
        name={name}
        label={label}
        rules={rules}
        valuePropName="checked"
      >
        <Checkbox name={name} onChange={handleFieldChange}>
          {placeholder}
        </Checkbox>
      </Form.Item>
    );
  }
);
