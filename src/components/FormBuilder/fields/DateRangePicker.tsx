import React, { useCallback } from "react";
import dayjs, { Dayjs } from "dayjs";

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
  storeFormat?: string;
  maxDate?: string;
  minDate?: string;
  defaultPickerValue?: any;
  isDisabledDate?: (current: Dayjs) => boolean;
}

interface FieldProps extends FormFieldProps<DateRangePickerParams> {
  format: string;
  storeFormat?: string;
  value: DateRangePickerParams;
  isDisabledDate?: (current: Dayjs) => boolean;
}

const Field: React.FC<FieldProps> = ({
  format,
  storeFormat,
  value,
  isDisabledDate,
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
      dateFrom={
        value.from && storeFormat ? dayjs(value.from, storeFormat) : value.from
      }
      dateTo={value.to && storeFormat ? dayjs(value.to, storeFormat) : value.to}
      isDisabledDate={isDisabledDate}
      fullWidth
      {...restProps}
    />
  );
};

export const FieldDateRangePicker: React.FC<FieldDateRangePickerProps> = React.memo(
  ({ format, label, rules, name, onChange, isDisabledDate, ...restProps }) => {
    const handleChange = ([from, to]: [Dayjs, Dayjs]) => {
      onChange({ name, value: { from, to } });
    };

    return (
      <Form.Item name={name} label={label} rules={rules}>
        <Field
          //@ts-ignore
          onChange={handleChange}
          format={format}
          isDisabledDate={isDisabledDate}
          {...restProps}
        />
      </Form.Item>
    );
  }
);
