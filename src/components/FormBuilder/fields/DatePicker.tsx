import React, { useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Form } from "antd";
import DatePicker from "../../DatePicker";
import { FieldDatePickerProps, FormFieldProps } from "../types";
interface FieldProps extends FormFieldProps<any> {
  format: string;
  storeFormat?: string;
  value: any;
}

const Field: React.FC<FieldProps> = ({
  format,
  storeFormat,
  value,
  onChange,
  ...restProps
}) => {
  const formatedValue = useMemo<Dayjs>(() => {
    if (!value) return null;
    return dayjs(value);
  }, [value]);

  return (
    //@ts-ignore
    <DatePicker
      {...restProps}
      //@ts-ignore
      onChange={onChange}
      format={format}
      value={formatedValue}
    />
  );
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
