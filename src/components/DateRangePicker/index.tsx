import * as React from "react";
import { useMemo, useCallback } from "react";

import dayjs, { Dayjs } from "dayjs";
import DatePicker from "../DatePicker";
import { DateType, IDateRangePicker, DateRangePickerProps } from "./types.d";

import "./index.less";

const { RangePicker } = DatePicker;

const DateRangePicker: IDateRangePicker = props => {
  const formatDate = useCallback(
    (date: DateType) => {
      return dayjs(date, props.format) as Dayjs;
    },
    [props.format]
  );

  const [dateFrom, dateTo] = useMemo<[Dayjs, Dayjs]>(() => {
    return [formatDate(props.dateFrom), formatDate(props.dateTo)];
  }, [props.dateFrom, props.dateTo, formatDate]);

  const [maxDate, minDate] = useMemo<[Dayjs, Dayjs]>(() => {
    return [formatDate(props.maxDate), formatDate(props.minDate)];
  }, [props.maxDate, props.minDate, formatDate]);

  const isDisabledDate = useCallback(
    date => {
      return (maxDate && date > maxDate) || (minDate && date < minDate);
    },
    [maxDate, minDate]
  );

  function onChange([dateFrom, dateTo]): void {
    if (!(dateFrom && dateTo)) props.onClear && props.onClear();
    else props.onChange && props.onChange(arguments[0], arguments[1]);
  }

  return (
    <RangePicker
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
