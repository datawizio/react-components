import * as React from "react";
import { useCallback, useContext, useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import DatePicker from "../DatePicker";
import ConfigContext from "../ConfigProvider/context";
import {
  DefaultPreset,
  DefaultPresetPrev,
  DefaultPresetRanges
} from "./presets";
import { DateRangePickerProps, DateType, IDateRangePicker } from "./types";
import "./index.less";

dayjs.extend(customParseFormat);

// const { RangePicker } = DatePicker;

const DateRangePicker: IDateRangePicker = ({
  fullWidth,
  type,
  ranges,
  presets,
  currDateRange,
  useDefaultPreset,
  defaultPresetExceptions,
  maxDateForPresets,
  ...props
}) => {
  const { translate } = useContext(ConfigContext);

  const getPresets = useCallback(() => {
    if (!ranges && !useDefaultPreset && !presets) return; // presets absent

    /* params priority:
     * - ranges
     * - presets
     * - useDefaultPreset
     * */

    if (ranges) return ranges;

    if (presets && presets.length) {
      let result = {};

      const defaultPreset = DefaultPreset(
        type,
        props.minDate,
        maxDateForPresets ?? props.maxDate
      );
      const defaultPresetPrev = DefaultPresetPrev(
        type,
        currDateRange?.date_from || props.dateFrom,
        currDateRange?.date_to || props.dateTo
      );

      presets.forEach(item => {
        if (defaultPreset[item]) result[item] = defaultPreset[item];
        if (defaultPresetPrev[item.toUpperCase()])
          result[item.toUpperCase()] = defaultPresetPrev[item.toUpperCase()];
      });

      return result;
    }

    if (useDefaultPreset) {
      const defaultPreset = {
        ...DefaultPreset(
          type,
          props.minDate,
          maxDateForPresets ?? props.maxDate
        )
      };
      if (defaultPresetExceptions && defaultPresetExceptions.length) {
        defaultPresetExceptions.forEach(item => {
          delete defaultPreset[item];
        });
      }
      return defaultPreset;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currDateRange,
    defaultPresetExceptions,
    presets,
    maxDateForPresets,
    props.dateFrom,
    props.dateTo,
    props.maxDate,
    props.minDate,
    ranges,
    useDefaultPreset
  ]);

  const translatedPreset = useMemo(() => {
    const presetRanges = getPresets();

    if (!presetRanges) return;

    const defaultPresetMap = new Map(Object.entries(presetRanges));
    const translatedPresetMap = new Map();

    defaultPresetMap.forEach((value, key) => {
      const translatedKey = translate(key);
      translatedPresetMap.set(translatedKey, value);
    });

    return Object.fromEntries(translatedPresetMap.entries());
  }, [getPresets, translate]);

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

  const isDisabledDate = useCallback(
    date => {
      const formatedDate = formatDate(date.format("DD-MM-YYYY"));
      return (
        (maxDate && formatedDate.isAfter(maxDate)) ||
        (minDate && formatedDate.isBefore(minDate))
      );
    },
    [maxDate, minDate, formatDate]
  );

  function onChange(value): void {
    const [dateFrom, dateTo] = value ? value : [null, null];
    if (!(dateFrom && dateTo)) props.onClear && props.onClear();
    else props.onChange && props.onChange(arguments[0], arguments[1]);
  }

  const RangePicker = DatePicker.Picker[type].RangePicker;

  return (
    <RangePicker
      {...props}
      //@ts-ignore
      ranges={translatedPreset}
      className={fullWidth ? "ant-picker-full-width" : ""}
      onChange={onChange}
      value={[dateFrom, dateTo]}
      disabledDate={isDisabledDate}
    />
  );
};

DateRangePicker.defaultProps = {
  type: "iso-8601",
  inputReadOnly: true,
  format: "DD-MM-YYYY",
  dateTo: "02-12-2001",
  dateFrom: "02-12-2001"
};

DateRangePicker.presets = DefaultPresetRanges;

export default DateRangePicker;

export const _DateRangePickerWithProps: React.FC<DateRangePickerProps> = {} as any;
