import {
  PeriodAvailable,
  PeriodAvailableForDates,
  PeriodOption,
  PrevPeriodConfig,
  PrevPeriodEnum
} from "./types";

export const FORMATTED_PATTERN = "YYYY-MM-DD";

export const DEFAULT_PERIOD = "last_7_days";
export const DEFAULT_PREV_PERIOD = "previous";

export const CUSTOM_PERIOD_KEY = "date";
export const CUSTOM_PREV_PERIOD_KEY = "prev_date";

export const PREV_PERIOD_CONFIG: PrevPeriodConfig = {
  previous: {},
  prev_date: {},
  prev_last_month: {
    type: "iso-8601"
  },
  prev_last_quarter: {},
  prev_last_week: {},
  prev_last_year: {},
  same_weekday_prev_year: {}
};

export const PREV_PERIOD_OPTIONS: Array<PrevPeriodEnum> = [
  "previous",
  "prev_last_week",
  "prev_last_month",
  "prev_last_quarter",
  "prev_last_year",
  "same_weekday_prev_year",
  "prev_date"
];

export const PERIOD_OPTIONS: Array<PeriodOption> = [
  "last_update_date",
  "penultimate_update_date",
  "last_7_days",
  "last_30_days",
  "last_90_days",
  "last_180_days",
  "last_365_days",
  "week_begin",
  "month_begin",
  "quarter_begin",
  "year_begin",
  "current_day",
  "current_week",
  "current_month",
  "current_quarter",
  "current_year",
  "prev_week",
  "prev_month",
  "prev_quarter",
  "prev_year",
  "all_time",
  "date"
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
  current_day: [
    "previous",
    "prev_last_month",
    "prev_last_quarter",
    "prev_last_year",
    "same_weekday_prev_year",
    "prev_date"
  ],
  current_week: [
    "previous",
    "prev_last_week",
    "prev_last_month",
    "prev_last_quarter",
    "prev_last_year",
    "same_weekday_prev_year",
    "prev_date"
  ],
  current_month: [
    "previous",
    "prev_last_month",
    "prev_last_quarter",
    "prev_last_year",
    "same_weekday_prev_year",
    "prev_date"
  ],
  current_quarter: [
    "previous",
    "prev_last_quarter",
    "prev_last_year",
    "same_weekday_prev_year",
    "prev_date"
  ],
  current_year: ["prev_last_year", "same_weekday_prev_year", "previous"],
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
