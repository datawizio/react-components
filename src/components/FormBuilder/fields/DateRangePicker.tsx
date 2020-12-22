import React, { useCallback } from "react";
import { Dayjs } from "dayjs";

import { Form } from "antd";
import DateRangePicker from "../../DateRangePicker";

import { FormFieldProps } from "../types";

export interface DateRangePickerParams {
  from: Dayjs;
  to: Dayjs;
}

export interface FieldDateRangePickerProps
  extends FormFieldProps<DateRangePickerParams> {
  format?: string;
  maxDate?: string;
  minDate?: string;
  defaultPickerValue?: any;
}

interface FieldProps extends FormFieldProps<DateRangePickerParams> {
  format: string;
  value: DateRangePickerParams;
}

const Field: React.FC<FieldProps> = ({
  format,
  value,
  onChange,
  ...restProps
}) => {
  const handleClear = useCallback(() => {
    //@ts-ignore
    onChange([null, null]);
  }, []);
  return (
    //@ts-ignore
    <DateRangePicker
      onChange={onChange}
      onClear={handleClear}
      format={format}
      dateFrom={value.from}
      dateTo={value.to}
      fullWidth
      {...restProps}
    />
  );
};

export const FieldDateRangePicker: React.FC<FieldDateRangePickerProps> = React.memo(
  ({ format, label, rules, name, onChange, ...restProps }) => {
    const handleChange = ([from, to]: [Dayjs, Dayjs]) => {
      onChange({ name, value: { from, to } });
    };

    return (
      <Form.Item name={name} label={label} rules={rules}>
        <Field
          //@ts-ignore
          onChange={handleChange}
          format={format}
          {...restProps}
        />
      </Form.Item>
    );
  }
);
