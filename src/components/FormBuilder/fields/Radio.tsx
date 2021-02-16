import React, { useCallback } from "react";

import { Form } from "antd";
import Radio from "../../Radio";

import { FieldRadioProps } from "../types";
import { RadioChangeEvent } from "antd/lib/radio";

export const FieldRadio: React.FC<FieldRadioProps> = React.memo(
  ({ label, rules, name, options, onChange }) => {
    const handleFieldChange = useCallback(
      ({ target: { value } }: RadioChangeEvent) => {
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
        <Radio.Group name={name} onChange={handleFieldChange}>
          {options.map(option => (
            <Radio value={option.value} key={option.value}>
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
    );
  }
);
