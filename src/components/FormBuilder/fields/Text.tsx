import React, { useCallback } from "react";

import { Form } from "antd";
import Input from "../../Input";

import { FieldTextProps } from "../types";

export const FieldText: React.FC<FieldTextProps> = React.memo(
  ({ onChange, rules, name, label, ...props }) => {
    const handleFieldChange = useCallback(
      ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
        onChange({
          name,
          value
        });
      },
      [onChange]
    );

    return (
      <Form.Item name={name} label={label} rules={rules}>
        <Input {...props} name={name} onChange={handleFieldChange} />
      </Form.Item>
    );
  }
);
