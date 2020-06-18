import React, { useCallback } from "react";

import { Form } from "antd";
import Checkbox from "../../Checkbox";

import { FieldTextProps } from "../types";

export const FieldCheckbox: React.FC<FieldTextProps> = React.memo(
  ({ label, rules, name, placeholder, onChange }) => {
    const handleFieldChange = useCallback(
      () => ({
        target: { name, value }
      }: React.ChangeEvent<HTMLInputElement>) => {
        onChange({
          name,
          value
        });
      },
      [onChange]
    );

    return (
      <Form.Item name={name} label={label} rules={rules}>
        <Checkbox name={name} onChange={handleFieldChange}>
          {placeholder}
        </Checkbox>
      </Form.Item>
    );
  }
);
