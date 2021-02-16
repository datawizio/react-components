import React, { useCallback } from "react";

import { Form, Switch } from "antd";

import { FieldCheckboxProps } from "../types";

export const FieldSwitch: React.FC<FieldCheckboxProps> = React.memo(
  ({ label, rules, name, onChange }) => {
    const handleFieldChange = useCallback(
      (checked: boolean) => {
        onChange &&
          onChange({
            name,
            value: checked
          });
      },
      [onChange, name]
    );

    return (
      <Form.Item
        name={name}
        label={label}
        rules={rules}
        valuePropName="checked"
      >
        <Switch onChange={handleFieldChange} />
      </Form.Item>
    );
  }
);
