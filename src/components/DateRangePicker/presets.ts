import moment from "moment";
import { DateRange, BasicPresetsType } from "./types";

export const BasicPresets: BasicPresetsType = {
  get yesterday(): DateRange {
    return [moment().subtract(1, "d"), moment().subtract(1, "d")];
  },

  get lastWeek(): DateRange {
    return [moment().subtract(6, "d"), moment()];
  },

  get currentMonth(): DateRange {
    return [moment().startOf("month"), moment()];
  },

  get last_30_days(): DateRange {
    return [moment().subtract(29, "d"), moment()];
  },

  get last_90_days(): DateRange {
    return [moment().subtract(89, "d"), moment()];
  },

  get currentYear(): DateRange {
    return [moment().startOf("y"), moment()];
  }
};
