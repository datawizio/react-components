import * as React from "react";
import { useMemo } from "react";
import moment, { Moment } from "moment";

import DatePicker from "antd/lib/date-picker";
import { DateType, IDateRangePicker, DateRangePickerProps } from "./types.d";

import "./index.less";

const { RangePicker } = DatePicker;

const DateRangePicker: IDateRangePicker = props => {
  const [dateFrom, dateTo] = useMemo<[Moment, Moment]>(() => {
    return [formatDate(props.dateFrom), formatDate(props.dateTo)];
  }, [props.dateFrom, props.dateTo, props.format]);

  const [maxDate, minDate] = useMemo<[Moment, Moment]>(() => {
    return [formatDate(props.maxDate), formatDate(props.minDate)];
  }, [props.maxDate, props.minDate, props.format]);

  function formatDate(date: DateType) {
    return moment(date, props.format);
  }

  function isDisabledDate(date): boolean {
    return (maxDate && date > maxDate) || (minDate && date < minDate);
  }

  function onChange([dateFrom, dateTo]): void {
    if (!(dateFrom && dateTo)) props.onClear && props.onClear();
    else props.onChange && props.onChange(arguments[0], arguments[1]);
  }

  return (
    <RangePicker
      onOpenChange={console.log}
      value={[dateFrom, dateTo]}
      disabledDate={isDisabledDate}
      {...props}
      onChange={onChange}
    />
  );
};

DateRangePicker.defaultProps = {
  inputReadOnly: true,
  format: "DD-MM-YYYY",
  dateTo: "02-12-2001",
  dateFrom: "02-12-2001"
};

DateRangePicker.presets = require("./presets").BasicPresets;

export default DateRangePicker;
export const _DateRangePickerWithProps: React.FC<DateRangePickerProps> = {} as any;
