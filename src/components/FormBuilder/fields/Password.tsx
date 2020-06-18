import React, { useCallback } from "react";

import { Form } from "antd";
import Input from "../../Input";

import { FieldTextProps } from "../types";

export const FieldText: React.FC<FieldTextProps> = React.memo(
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
        <Input.Password
          name={name}
          placeholder={placeholder}
          onChange={handleFieldChange}
        />
      </Form.Item>
    );
  }
);
