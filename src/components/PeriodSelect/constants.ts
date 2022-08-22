import {
  PeriodAvailable,
  PeriodAvailableForDates,
  PeriodOption,
  PrevPeriodEnum
} from "./types";

export const FORMATTED_PATTERN = "YYYY-MM-DD";

export const DEFAULT_PERIOD = "last_7_days";
export const DEFAULT_PREV_PERIOD = "previous";

export const CUSTOM_PERIOD_KEY = "date";
export const CUSTOM_PREV_PERIOD_KEY = "prev_date";

export const PREV_PERIOD_OPTIONS: Array<PrevPeriodEnum> = [
  "previous",
  "prev_last_week",
  "prev_last_month",
  "prev_last_quarter",
  "prev_last_year",
  "same_weekday_prev_year",
  "prev_date"
];

export const PERIOD_AVAILABLE: PeriodAvailable = {
  last_update_date: [
    "previous",
    "prev_last_week",
    "prev_last_month",
    "prev_last_quarter",
    "prev_last_year",
    "same_weekday_prev_year",
    "prev_date"
  ],
  penultimate_update_date: [
    "previous",
    "prev_last_week",
    "prev_last_month",
    "prev_last_quarter",
    "prev_last_year",
    "same_weekday_prev_year",
    "prev_date"
  ],
  last_7_days: [
    "previous",
    "prev_last_week",
    "prev_last_month",
    "prev_last_quarter",
    "prev_last_year",
    "same_weekday_prev_year",
    "prev_date"
  ],
  last_30_days: [
    "previous",
    "prev_last_quarter",
    "prev_last_year",
    "same_weekday_prev_year",
    "prev_date"
  ],
  last_90_days: [
    "previous",
    "prev_last_quarter",
    "prev_last_year",
    "same_weekday_prev_year",
    "prev_date"
  ],
  last_180_days: [
    "previous",
    "prev_last_year",
    "same_weekday_prev_year",
    "prev_date"
  ],
  last_365_days: [
    "previous",
    "prev_last_year",
    "same_weekday_prev_year",
    "prev_date"
  ],
  week_begin: [
    "previous",
    "prev_last_week",
    "prev_last_month",
    "prev_last_quarter",
    "prev_last_year",
    "same_weekday_prev_year",
    "prev_date"
  ],
  month_begin: [
    "previous",
    "prev_last_month",
    "prev_last_quarter",
    "prev_last_year",
    "same_weekday_prev_year",
    "prev_date"
  ],
  quarter_begin: [
    "previous",
    "prev_last_quarter",
    "prev_last_year",
    "same_weekday_prev_year",
    "prev_date"
  ],
  year_begin: ["prev_last_year", "same_weekday_prev_year", "previous"],
  prev_week: [
    "previous",
    "prev_last_month",
    "prev_last_quarter",
    "prev_last_year",
    "same_weekday_prev_year",
    "prev_date"
  ],
  prev_month: [
    "previous",
    "prev_last_quarter",
    "prev_last_year",
    "same_weekday_prev_year",
    "prev_date"
  ],
  prev_quarter: [
    "previous",
    "prev_last_quarter",
    "prev_last_year",
    "same_weekday_prev_year",
    "prev_date"
  ],
  prev_year: [
    "previous",
    "prev_last_year",
    "same_weekday_prev_year",
    "prev_date"
  ],
  all_time: [],
  date: ["previous", "prev_date"]
};

export const AVAILABLE_PERIODS_FOR_DATES: PeriodAvailableForDates = {
  week: [
    "previous",
    "prev_last_week",
    "prev_last_month",
    "prev_last_quarter",
    "prev_last_year",
    "same_weekday_prev_year",
    "prev_date"
  ],
  month: [
    "previous",
    "prev_last_month",
    "prev_last_quarter",
    "prev_last_year",
    "same_weekday_prev_year",
    "prev_date"
  ],

  quarter: [
    "previous",
    "prev_last_quarter",
    "prev_last_year",
    "same_weekday_prev_year",
    "prev_date"
  ],
  year: ["previous", "prev_last_year", "same_weekday_prev_year", "prev_date"],
  date: ["previous", "prev_date", "same_weekday_prev_year"]
};

export const PERIOD_OPTIONS: Array<PeriodOption> = Object.keys(
  PERIOD_AVAILABLE
) as Array<PeriodOption>;
