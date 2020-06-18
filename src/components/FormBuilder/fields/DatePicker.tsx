import React from "react";
import { Dayjs } from "dayjs";

import { Form } from "antd";
import DatePicker from "../../DatePicker";

import { FieldDatePickerProps } from "../types";

export const FieldDatePicker: React.FC<FieldDatePickerProps> = React.memo(
  ({ format, label, rules, name, placeholder, onChange }) => {
    const handleChange = (value: Dayjs) => {
      onChange({ name, value });
    };

    return (
      <Form.Item name={name} label={label} rules={rules}>
        <DatePicker
          placeholder={placeholder}
          //@ts-ignore
          onChange={handleChange}
          format={format}
        />
      </Form.Item>
    );
  }
);
