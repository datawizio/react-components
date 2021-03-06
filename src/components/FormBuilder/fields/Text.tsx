import React, { useCallback } from "react";

import { Form } from "antd";
import Input from "../../Input";

import { FieldTextProps } from "../types";

export const FieldText: React.FC<FieldTextProps> = React.memo(
  React.forwardRef(({ onChange, rules, name, label, ...props }, ref) => {
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
        <Input
          {...props}
          //@ts-ignore
          ref={ref}
          onChange={handleFieldChange}
        />
      </Form.Item>
    );
  })
);
