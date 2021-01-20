import * as React from "react";
import { useMemo, useCallback, useContext } from "react";
import dayjs, { Dayjs } from "dayjs";
import DatePicker from "../DatePicker";
import ConfigContext from "../ConfigProvider/context";
import { DefaultPreset } from "./presets";
import { DateType, IDateRangePicker, DateRangePickerProps } from "./types";
import "./index.less";

const { RangePicker } = DatePicker;

const DateRangePicker: IDateRangePicker = ({
  fullWidth,
  defaultPresetUsed,
  isDisabledDate,
  ...props
}) => {
  const { translate } = useContext(ConfigContext);

  const translatedPreset = useMemo(() => {
    if (!defaultPresetUsed) return;

    const defaultPresetMap = new Map(Object.entries(DefaultPreset));
    const translatedPresetMap = new Map();

    defaultPresetMap.forEach((value, key) => {
      const translatedKey = translate(key);
      translatedPresetMap.set(translatedKey, value);
    });

    return Object.fromEntries(translatedPresetMap.entries());
  }, [defaultPresetUsed, translate]);

  const formatDate = useCallback(
    (date: DateType) => {
      if (!date) return null;
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

  const isDisabledDateDefault = useCallback(
    date => {
      return (maxDate && date > maxDate) || (minDate && date < minDate);
    },
    [maxDate, minDate]
  );

  function onChange(value): void {
    const [dateFrom, dateTo] = value ? value : [null, null];
    if (!(dateFrom && dateTo)) props.onClear && props.onClear();
    else props.onChange && props.onChange(arguments[0], arguments[1]);
  }

  return (
    <RangePicker
      {...props}
      ranges={defaultPresetUsed ? translatedPreset : props.ranges}
      className={fullWidth ? "ant-picker-full-width" : ""}
      onChange={onChange}
      value={[dateFrom, dateTo]}
      disabledDate={isDisabledDate || isDisabledDateDefault}
    />
  );
};

DateRangePicker.defaultProps = {
  inputReadOnly: true,
  format: "DD-MM-YYYY",
  dateTo: "02-12-2001",
  dateFrom: "02-12-2001"
};

DateRangePicker.presets = require("./presets").DefaultPresetRanges;

export default DateRangePicker;

export const _DateRangePickerWithProps: React.FC<DateRangePickerProps> = {} as any;
