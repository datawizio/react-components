import dayjs from "dayjs";
import { DateRange, BasicPresetsType } from "./types";

export const BasicPresets: BasicPresetsType = {
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
