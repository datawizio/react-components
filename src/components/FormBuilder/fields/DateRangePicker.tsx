import React, { useCallback, useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";

import { Form } from "antd";
import DateRangePicker from "../../DateRangePicker";

import { FormFieldProps } from "../types";
import { DateType, PresetsRangeType } from "../../DateRangePicker/types";

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
  ranges?: PresetsRangeType;
  presets?: string[];
  useDefaultPreset?: boolean;
  defaultPresetExceptions?: string[];
  currDateRange?: {
    date_from: DateType;
    date_to: DateType;
  };
}

interface FieldProps extends FormFieldProps<DateRangePickerParams> {
  format: string;
  storeFormat?: string;
  value: DateRangePickerParams;
}

const Field: React.FC<FieldProps> = ({
  format,
  storeFormat,
  value,
  onChange,
  ...restProps
}) => {
  const handleClear = useCallback(() => {
    //@ts-ignore
    onChange && onChange([null, null]);
  }, [onChange]);

  const dateFrom = useMemo(() => {
    if (Array.isArray(value) && value.length) {
      value.from = value[0];
    }
    return value.from && storeFormat
      ? dayjs(value.from, storeFormat)
      : value.from;
  }, [storeFormat, value]);

  const dateTo = useMemo(() => {
    if (Array.isArray(value) && value.length) {
      value.to = value[1];
    }
    return value.to && storeFormat ? dayjs(value.to, storeFormat) : value.to;
  }, [storeFormat, value]);

  return (
    //@ts-ignore
    <DateRangePicker
      onChange={onChange}
      onClear={handleClear}
      format={format}
      dateFrom={dateFrom}
      dateTo={dateTo}
      fullWidth
      {...restProps}
    />
  );
};

export const FieldDateRangePicker: React.FC<FieldDateRangePickerProps> = React.memo(
  ({ format, label, rules, name, onChange, ...restProps }) => {
    const handleChange = ([from, to]: [Dayjs, Dayjs]) => {
      onChange && onChange({ name, value: { from, to } });
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
