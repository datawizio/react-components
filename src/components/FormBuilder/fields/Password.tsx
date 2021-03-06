import React, { useCallback } from "react";

import { Form } from "antd";
import Input from "../../Input";

import { FieldTextProps } from "../types";

export const FieldPassword: React.FC<FieldTextProps> = React.memo(
  ({ label, rules, name, placeholder, onChange }) => {
    const handleFieldChange = useCallback(
      ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
        onChange &&
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
          placeholder={placeholder}
          onChange={handleFieldChange}
        />
      </Form.Item>
    );
  }
);
