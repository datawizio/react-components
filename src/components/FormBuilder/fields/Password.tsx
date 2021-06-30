import React, { useCallback } from "react";

import { Form } from "antd";
import Input from "../../Input";

import { FieldTextProps } from "../types";

export const FieldPassword: React.FC<FieldTextProps> = React.memo(
  ({ label, rules, name, placeholder, onChange, ...props }) => {
    const handleFieldChange = useCallback(
      ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        onChange &&
          onChange({
            name,
            value
          });
      },
      [name, onChange]
    );

    return (
      <Form.Item name={name} label={label} rules={rules}>
        <Input.Password
          {...props}
          placeholder={placeholder}
          onChange={handleFieldChange}
        />
      </Form.Item>
    );
  }
);
