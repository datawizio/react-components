import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DateRange, DefaultPresetPrevType, DefaultPresetType } from "./types";
import { genPrevPeriod, reverseDate } from "./utils";
import { fiscalCalendar } from "../../utils/fiscalCalendar";
import { calendarInfo } from "../../utils/calendar";

dayjs.extend(quarterOfYear);
dayjs.extend(customParseFormat);

const format = "DD-MM-YYYY";

export const DefaultPresetRanges: DefaultPresetType = {
  last_update_date: (maxDate = null): DateRange => {
    const max = maxDate ? dayjs(maxDate, format) : dayjs();
    return [max, max];
  },

  yesterday: (maxDate = null): DateRange => {
    const max = maxDate
      ? dayjs(maxDate, format).subtract(1, "d")
      : dayjs().subtract(1, "d");
    return [max, max];
  },

  week_begin: (maxDate = null): DateRange => {
    const min = maxDate
      ? dayjs(maxDate, format).startOf("week")
      : dayjs().startOf("week");
    const max = maxDate ? dayjs(maxDate, format) : dayjs();
    return [min, max];
  },

  lastWeek: (maxDate = null): DateRange => {
    const min = maxDate
      ? dayjs(maxDate, format).subtract(6, "d")
      : dayjs().subtract(6, "d");
    const max = maxDate ? dayjs(maxDate, format) : dayjs();
    return [min, max];
  },

  currentMonth: (maxDate = null): DateRange => {
    const min = maxDate
      ? dayjs(maxDate, format).startOf("month")
      : dayjs().startOf("month");
    const max = maxDate ? dayjs(maxDate, format) : dayjs();
    return [min, max];
  },

  last_30_days: (maxDate = null): DateRange => {
    const min = maxDate
      ? dayjs(maxDate, format).subtract(29, "d")
      : dayjs().subtract(29, "d");
    const max = maxDate ? dayjs(maxDate, format) : dayjs();
    return [min, max];
  },

  last_90_days: (maxDate = null): DateRange => {
    const min = maxDate
      ? dayjs(maxDate, format).subtract(89, "d")
      : dayjs().subtract(89, "d");
    const max = maxDate ? dayjs(maxDate, format) : dayjs();
    return [min, max];
  },

  quarterBegin: (maxDate = null): DateRange => {
    maxDate = maxDate ? dayjs(maxDate, format) : dayjs();
    let startQuater = calendarInfo.getStartOfYear(maxDate);
    while (startQuater.add(3, "month").isBefore(maxDate)) {
      startQuater = startQuater.add(3, "month");
    }
    return [startQuater, maxDate];
  },

  last_180_days: (maxDate = null): DateRange => {
    const min = maxDate
      ? dayjs(maxDate, format).subtract(179, "d")
      : dayjs().subtract(179, "d");
    const max = maxDate ? dayjs(maxDate, format) : dayjs();
    return [min, max];
  },

  last_364_days: (maxDate = null): DateRange => {
    const min = maxDate
      ? dayjs(maxDate, format).subtract(363, "d")
      : dayjs().subtract(363, "d");
    const max = maxDate ? dayjs(maxDate, format) : dayjs();
    return [min, max];
  },

  last_365_days: (maxDate = null): DateRange => {
    const min = maxDate
      ? dayjs(maxDate, format).subtract(364, "d")
      : dayjs().subtract(364, "d");
    const max = maxDate ? dayjs(maxDate, format) : dayjs();
    return [min, max];
  },

  currentYear: (maxDate = null): DateRange => {
    let min = maxDate ? dayjs(maxDate, format) : dayjs();
    min = calendarInfo.getStartOfYear(min);
    const max = maxDate ? dayjs(maxDate, format) : dayjs();
    return [min, max];
  },

  allPeriod: (minDate = null, maxDate = null): DateRange => {
    const min = minDate ? dayjs(minDate, format) : dayjs().subtract(10, "year");
    const max = maxDate ? dayjs(maxDate, format) : dayjs();
    return [min, max];
  }
};

export const DefaultPresetPrevRanges: DefaultPresetPrevType = {
  previous: (dateFrom = null, dateTo = null): DateRange => {
    let [min, max] = genPrevPeriod(dateFrom, dateTo);
    min = min ? dayjs(min, format) : null;
    max = max ? dayjs(max, format) : null;
    return [min, max];
  },
  prev_last_week: (dateFrom = null, dateTo = null): DateRange => {
    const min = dayjs(dateFrom, format).subtract(1, "week");
    const max = dayjs(dateTo, format).subtract(1, "week");
    return [min, max];
  },
  prev_last_month: (dateFrom = null, dateTo = null): DateRange => {
    const min = dayjs(dateFrom, format).subtract(1, "month");
    const max = dayjs(dateTo, format).subtract(1, "month");
    return [min, max];
  },
  prev_last_quarter: (dateFrom = null, dateTo = null): DateRange => {
    const min = dayjs(dateFrom, format).subtract(1, "quarter");
    const max = dayjs(dateTo, format).subtract(1, "quarter");
    return [min, max];
  },
  prev_last_year: (dateFrom = null, dateTo = null): DateRange => {
    // @ts-ignore
    const diff = dayjs(reverseDate(dateTo)).diff(reverseDate(dateFrom), "day");
    const min = dayjs(dateFrom, format).subtract(1, "year");
    const max = min.add(+diff, "day");
    return [min, max];
  }
};

export const DefaultPreset = (type, minDate, maxDate) => {
  return {
    "LAST_UPDATE_DATE": DefaultPresetRanges.last_update_date(maxDate),
    "LAST_7_DAYS": DefaultPresetRanges.lastWeek(maxDate),
    "LAST_30_DAYS": DefaultPresetRanges.last_30_days(maxDate),
    "Last_90_Days": DefaultPresetRanges.last_90_days(maxDate),
    "LAST_180_DAYS": DefaultPresetRanges.last_180_days(maxDate),
    "LAST_365_DAYS":
      type === "fiscal"
        ? DefaultPresetRanges.last_364_days(maxDate)
        : DefaultPresetRanges.last_365_days(maxDate),
    "WEEK_BEGIN": DefaultPresetRanges.week_begin(maxDate),
    "MONTH_BEGIN":
      type === "fiscal"
        ? fiscalCalendar.presetCurrentMonth(maxDate)
        : DefaultPresetRanges.currentMonth(maxDate),
    "QUARTER_BEGIN":
      type === "fiscal"
        ? fiscalCalendar.presetCurrentQuater(maxDate)
        : DefaultPresetRanges.quarterBegin(maxDate),
    "cur_year":
      type === "fiscal"
        ? fiscalCalendar.presetCurrentYear(maxDate)
        : DefaultPresetRanges.currentYear(maxDate),
    "All_period": DefaultPresetRanges.allPeriod(minDate, maxDate)
  };
};

export const DefaultPresetPrev = (type, dateFrom, dateTo) => {
  if (dateFrom === "Invalid Date") dateFrom = null;
  if (dateTo === "Invalid Date") dateTo = null;
  return {
    "PREVIOUS": DefaultPresetPrevRanges.previous(dateFrom, dateTo),
    "PREV_LAST_WEEK": DefaultPresetPrevRanges.prev_last_week(dateFrom, dateTo),
    "PREV_LAST_MONTH":
      type === "fiscal"
        ? null
        : DefaultPresetPrevRanges.prev_last_month(dateFrom, dateTo),
    "PREV_LAST_QUARTER":
      type === "fiscal"
        ? fiscalCalendar.prevLastQuarter(dateFrom, dateTo)
        : DefaultPresetPrevRanges.prev_last_quarter(dateFrom, dateTo),
    "PREV_LAST_YEAR":
      type === "fiscal"
        ? fiscalCalendar.prevLastYear(dateFrom, dateTo)
        : DefaultPresetPrevRanges.prev_last_year(dateFrom, dateTo)
  };
};
