import * as React from "react";
import { useCallback, useContext, useEffect, useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import DatePicker from "../DatePicker";
import ConfigContext from "../ConfigProvider/context";
import { DefaultPreset, DefaultPresetPrev } from "./presets";
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

  useEffect(function () {
    // TODO: move to helper
    // https://stackoverflow.com/questions/3219758/detect-changes-in-the-dom
    const observeDOM = (function () {
      const MutationObserver =
        // @ts-ignore
        window.MutationObserver || window.WebKitMutationObserver;

      return function (obj, callback) {
        if (!obj || obj.nodeType !== 1) return;

        if (MutationObserver) {
          // define a new observer
          const mutationObserver = new MutationObserver(callback);

          // have the observer observe foo for changes in children
          mutationObserver.observe(obj, { childList: true, subtree: true });
          return mutationObserver;
        }

        // browser support fallback
        else if (window.addEventListener) {
          obj.addEventListener("DOMNodeInserted", callback, false);
          obj.addEventListener("DOMNodeRemoved", callback, false);
        }
      };
    })();

    // --------------------------------------------------------------------

    const addPresetActiveClass = presetTags => {
      for (let j = 0; j < presetTags.length; j++) {
        presetTags[j].addEventListener("click", () => {
          removePresetActiveClass(presetTags);
          this.classList.add("datepicker-preset-active");
        });
      }
    };

    const removePresetActiveClass = presetTags => {
      for (let j = 0; j < presetTags.length; j++) {
        this.classList.remove("datepicker-preset-active");
      }
    };

    // --------------------------------------------------------------------
    observeDOM(document.querySelector("body"), function (records) {
      for (let i = 0; i < records.length; i++) {
        if (
          records[i].target.innerHTML.startsWith(
            '<div><div class="ant-picker-dropdown ant-picker-dropdown-range'
          )
        ) {
          const presetTags = document.querySelectorAll(
            ".ant-picker-ranges .ant-picker-preset .ant-tag"
          );
          if (presetTags.length) addPresetActiveClass(presetTags);
        }
      }
    });
  }, []);

  // --------------------------------------------------------------------

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

DateRangePicker.presets = require("./presets").DefaultPresetRanges;

export default DateRangePicker;

export const _DateRangePickerWithProps: React.FC<DateRangePickerProps> = {} as any;
