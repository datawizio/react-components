import React from "react";
import { Dayjs } from "dayjs";

import { Form } from "antd";
import DatePicker from "../../DatePicker";

import { FieldDatePickerProps } from "../types";

export const FieldDatePicker: React.FC<FieldDatePickerProps> = React.memo(
  ({
    format,
    label,
    rules,
    name,
    placeholder,
    fullWidth,
    onChange,
    inputReadOnly,
    ...restProps
  }) => {
    const handleChange = (value: Dayjs) => {
      onChange && onChange({ name, value });
    };

    return (
      <Form.Item name={name} label={label} rules={rules}>
        <DatePicker
          {...restProps}
          inputReadOnly={inputReadOnly}
          placeholder={placeholder}
          //@ts-ignore
          onChange={handleChange}
          format={format}
          className={fullWidth ? "ant-picker-w100" : ""}
        />
      </Form.Item>
    );
  }
);
