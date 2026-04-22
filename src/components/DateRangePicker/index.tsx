import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import DatePicker from "../DatePicker";
import ConfigContext from "../ConfigProvider/context";
import { useCallback, useContext, useMemo } from "react";
import { DATE_FORMATS } from "../../utils/dateFormat/constants";
import {
  DefaultPreset,
  DefaultPresetPrev,
  DefaultPresetRanges
} from "./presets";

import type { DateRangePickerProps, DateType, IDateRangePicker } from "./types";

import "./index.less";

dayjs.extend(customParseFormat);

const DateRangePicker: IDateRangePicker = ({
  fullWidth,
  type,
  ranges,
  presets,
  currDateRange,
  useDefaultPreset,
  defaultPresetExceptions,
  maxDateForPresets,
  useCurrentDayPreset,
  ...props
}) => {
  const { translate } = useContext(ConfigContext);

  const getDate = useCallback(
    (date: DateType) => {
      if (!date) return null;
      return dayjs(date, props.format);
    },
    [props.format]
  );

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
        getDate(props.minDate),
        getDate(maxDateForPresets ?? props.maxDate),
        useCurrentDayPreset
      );
      const defaultPresetPrev = DefaultPresetPrev(
        type,
        getDate(currDateRange?.date_from || props.dateFrom),
        getDate(currDateRange?.date_to || props.dateTo)
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
          getDate(props.minDate),
          getDate(maxDateForPresets ?? props.maxDate),
          useCurrentDayPreset
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
    getDate,
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

  const [dateFrom, dateTo] = useMemo<[Dayjs, Dayjs]>(() => {
    return [getDate(props.dateFrom), getDate(props.dateTo)];
  }, [props.dateFrom, props.dateTo, getDate]);

  const [maxDate, minDate] = useMemo<[Dayjs, Dayjs]>(() => {
    return [getDate(props.maxDate), getDate(props.minDate)];
  }, [props.maxDate, props.minDate, getDate]);

  const isDisabledDate = useCallback(
    date => {
      const formatedDate = getDate(date.format(props.format));
      return (
        (maxDate && formatedDate.isAfter(maxDate)) ||
        (minDate && formatedDate.isBefore(minDate))
      );
    },
    [maxDate, minDate, getDate, props.format]
  );

  function onChange(value): void {
    const [dateFrom, dateTo] = value || [null, null];

    const emptyCheck = props.allowEmpty?.some(Boolean)
      ? !dateFrom && !dateTo
      : !dateFrom || !dateTo;

    if (emptyCheck) props.onClear?.();
    else props.onChange?.(arguments[0], arguments[1]);
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
  format: DATE_FORMATS.DATE,
  dateTo: "02-12-2001",
  dateFrom: "02-12-2001"
};

DateRangePicker.presets = DefaultPresetRanges;

export default DateRangePicker;

export const _DateRangePickerWithProps: React.FC<DateRangePickerProps> = {} as any;
