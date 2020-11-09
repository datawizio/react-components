export const FORMATTED_PATTERN = "YYYY-MM-DD";

export const DEFAULT_PERIOD = "last_7_days";
export const DEFAULT_PREV_PERIOD = "previous";

export const CUSTOM_PERIOD_KEY = "date";
export const CUSTOM_PREV_PERIOD_KEY = "prev_date";

export const PREV_PERIOD_OPTIONS = [
  "previous",
  "prev_last_week",
  "prev_last_month",
  "prev_last_quarter",
  "prev_last_year",
  "prev_date"
];

export const PERIOD_AVAILABLE = {
  today: [
    "previous",
    "prev_last_week",
    "prev_last_month",
    "prev_last_quarter",
    "prev_last_year",
    "prev_date"
  ],
  last_day: [
    "previous",
    "prev_last_week",
    "prev_last_month",
    "prev_last_quarter",
    "prev_last_year",
    "prev_date"
  ],
  last_7_days: [
    "previous",
    "prev_last_month",
    "prev_last_quarter",
    "prev_last_year",
    "prev_date"
  ],
  prev_week: [
    "previous",
    "prev_last_month",
    "prev_last_quarter",
    "prev_last_year",
    "prev_date"
  ],
  week_begin: [
    "previous",
    "prev_last_week",
    "prev_last_month",
    "prev_last_quarter",
    "prev_last_year",
    "prev_date"
  ],
  month_begin: [
    "previous",
    "prev_last_month",
    "prev_last_quarter",
    "prev_last_year",
    "prev_date"
  ],
  prev_month: ["previous", "prev_last_quarter", "prev_last_year", "prev_date"],
  season_begin: [
    "previous",
    "prev_last_quarter",
    "prev_last_year",
    "prev_date"
  ],
  year_begin: ["prev_last_year", "previous"],
  last_30_days: [
    "previous",
    "prev_last_quarter",
    "prev_last_year",
    "prev_date"
  ],
  last_180_days: ["previous", "prev_last_year", "prev_date"],
  last_365_days: ["previous", "prev_last_year", "prev_date"],
  all_time: [],
  date: ["previous", "prev_date"]
};

export const PERIOD_OPTIONS = Object.keys(PERIOD_AVAILABLE);
