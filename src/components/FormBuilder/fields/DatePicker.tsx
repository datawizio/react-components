import React, { useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Form } from "antd";
import DatePicker, { CalendarTypes } from "../../DatePicker";
import { FieldDatePickerProps, FormFieldProps } from "../types";

interface FieldProps extends FormFieldProps<any> {
  format: string;
  storeFormat?: string;
  value: any;
  type?: CalendarTypes;
  disabledDate?: (currentDate: Dayjs) => boolean;
}

const Field: React.FC<FieldProps> = ({
  format,
  type,
  storeFormat,
  value,
  onChange,
  ...restProps
}) => {
  const formatedValue = useMemo<Dayjs>(() => {
    if (!value) return null;
    if (typeof value === "string") return dayjs(value);
    return value;
  }, [value]);
  const Component = DatePicker.Picker[type];
  return (
    //@ts-ignore
    <Component
      {...restProps}
      //@ts-ignore
      onChange={onChange}
      format={format}
      value={formatedValue}
    />
  );
};

Field.defaultProps = {
  type: "iso-8601"
};

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
        <Field
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
