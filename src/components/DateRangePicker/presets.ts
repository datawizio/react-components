import dayjs from "dayjs";
import { DateRange, DefaultPresetType } from "./types";

export const DefaultPresetRanges: DefaultPresetType = {
  get yesterday(): DateRange {
    return [dayjs().subtract(1, "d"), dayjs().subtract(1, "d")];
  },

  get lastWeek(): DateRange {
    return [dayjs().subtract(6, "d"), dayjs()];
  },

  get currentMonth(): DateRange {
    return [dayjs().startOf("month"), dayjs()];
  },

  get last_30_days(): DateRange {
    return [dayjs().subtract(29, "d"), dayjs()];
  },

  get last_90_days(): DateRange {
    return [dayjs().subtract(89, "d"), dayjs()];
  },

  get currentYear(): DateRange {
    return [dayjs().startOf("y"), dayjs()];
  }
};

export const DefaultPreset = {
  "Yesterday": DefaultPresetRanges.yesterday,
  "Last_week": DefaultPresetRanges.lastWeek,
  "Current_month": DefaultPresetRanges.currentMonth,
  "Last_30_Days": DefaultPresetRanges.last_30_days,
  "Last_90_Days": DefaultPresetRanges.last_90_days,
  "cur_year": DefaultPresetRanges.currentYear,
}
