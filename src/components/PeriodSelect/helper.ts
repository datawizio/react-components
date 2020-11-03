import dayjs from "dayjs";
import { FORMATTED_PATTERN } from "./constants";
import { DateRangeType } from "./types";

export const getPrevPeriod = ({ date, prev_period, clientDate, period }) => {
  const newPrevPeriod = {
    startDate: null,
    endDate: null
  };
  switch (date) {
    case "today":
      newPrevPeriod.startDate = dayjs(clientDate).subtract(1, "day");
      newPrevPeriod.endDate = dayjs(clientDate).subtract(1, "day");
      break;
    case "last_day":
      newPrevPeriod.startDate = dayjs(clientDate).subtract(2, "day");
      newPrevPeriod.endDate = dayjs(clientDate).subtract(2, "day");
      break;
    case "last_7_days":
      newPrevPeriod.startDate = dayjs(clientDate).subtract(13, "day");
      newPrevPeriod.endDate = dayjs(clientDate).subtract(7, "day");
      break;
    case "prev_week":
      newPrevPeriod.startDate = dayjs(clientDate)
        .startOf("week")
        .subtract(2, "week");
      newPrevPeriod.endDate = dayjs(newPrevPeriod.startDate).endOf("week");
      break;
    case "week_begin":
      newPrevPeriod.startDate = dayjs(clientDate)
        .startOf("week")
        .subtract(1, "week");
      newPrevPeriod.endDate = dayjs(clientDate).subtract(1, "week");
      break;
    case "month_begin":
      newPrevPeriod.startDate = dayjs(clientDate)
        .startOf("month")
        .subtract(1, "month");
      newPrevPeriod.endDate = dayjs(clientDate).subtract(1, "month");
      break;
    case "prev_month":
      newPrevPeriod.startDate = dayjs(clientDate)
        .startOf("month")
        .subtract(2, "month");
      newPrevPeriod.endDate = dayjs(newPrevPeriod.startDate).endOf("month");
      break;
    case "season_begin":
      newPrevPeriod.startDate = dayjs(clientDate)
        .startOf("quarter")
        .subtract(1, "quarter");
      newPrevPeriod.endDate = dayjs(clientDate).subtract(1, "quarter");
      break;
    case "year_begin":
      newPrevPeriod.startDate = dayjs(clientDate)
        .startOf("year")
        .subtract(1, "year");
      newPrevPeriod.endDate = dayjs(clientDate).subtract(1, "year");
      break;
    case "last_30_days":
      newPrevPeriod.startDate = dayjs(clientDate).subtract(60, "day");
      newPrevPeriod.endDate = dayjs(clientDate).subtract(29, "day");
      break;
    case "last_180_days":
      newPrevPeriod.startDate = dayjs(clientDate).subtract(360, "day");
      newPrevPeriod.endDate = dayjs(clientDate).subtract(179, "day");
      break;
    case "last_365_days":
      newPrevPeriod.startDate = dayjs(clientDate).subtract(728, "day");
      newPrevPeriod.endDate = dayjs(clientDate).subtract(364, "day");
      break;

    default:
      const startPickerDate = date[0];
      const endPickerDate = date[1];

      const diff = dayjs(endPickerDate).diff(startPickerDate, "day");
      newPrevPeriod.startDate = dayjs(startPickerDate).subtract(1, "day");
      newPrevPeriod.endDate = dayjs(startPickerDate).subtract(diff + 1, "day");
      break;
  }

  switch (prev_period) {
    case "prev_last_week":
      newPrevPeriod.startDate = dayjs(period.startDate).subtract(1, "week");
      newPrevPeriod.endDate = dayjs(period.endDate).subtract(1, "week");
      break;
    case "prev_last_month":
      newPrevPeriod.startDate = dayjs(period.startDate).subtract(1, "month");
      newPrevPeriod.endDate = dayjs(period.endDate).subtract(1, "month");
      break;
    case "prev_last_quarter":
      newPrevPeriod.startDate = dayjs(period.startDate).subtract(1, "quarter");
      newPrevPeriod.endDate = dayjs(period.endDate).subtract(1, "quarter");
      break;
    case "prev_last_year":
      newPrevPeriod.startDate = dayjs(period.startDate).subtract(1, "year");
      newPrevPeriod.endDate = dayjs(period.endDate).subtract(1, "year");
      break;
    case "prev_date":
      newPrevPeriod.startDate = dayjs(date[0]);
      newPrevPeriod.endDate = dayjs(date[1]);
      break;
    default:
      //if selected previous do nothing
      break;
  }
  if (newPrevPeriod.startDate && newPrevPeriod.endDate) {
    return {
      startDate: newPrevPeriod.startDate.format(FORMATTED_PATTERN),
      endDate: newPrevPeriod.endDate.format(FORMATTED_PATTERN)
    };
  }
};

export const getPeriod = ({
  periodKey,
  date = null,
  clientDate,
  clientStartDate
}) => {
  const newPeriod = {
    startDate: null,
    endDate: null
  };

  switch (periodKey) {
    case "today":
      newPeriod.startDate = dayjs(clientDate);
      newPeriod.endDate = dayjs(clientDate);
      break;
    case "last_day":
      const lastDay = dayjs(clientDate).subtract(1, "day");
      newPeriod.startDate = lastDay;
      newPeriod.endDate = lastDay;
      break;
    case "last_7_days":
      newPeriod.endDate = dayjs(clientDate);
      newPeriod.startDate = dayjs(clientDate).subtract(6, "day");
      break;
    case "prev_week":
      newPeriod.startDate = dayjs(clientDate)
        .startOf("week")
        .subtract(1, "week");
      newPeriod.endDate = dayjs(newPeriod.startDate).endOf("week");
      break;
    case "week_begin":
      newPeriod.startDate = dayjs(clientDate).startOf("week");
      newPeriod.endDate = dayjs(clientDate);
      break;
    case "month_begin":
      newPeriod.startDate = dayjs(clientDate).startOf("month");
      newPeriod.endDate = dayjs(clientDate);
      break;
    case "prev_month":
      const prevMonth = dayjs(clientDate).startOf("month").subtract(1, "month");

      newPeriod.startDate = prevMonth;
      newPeriod.endDate = dayjs(newPeriod.startDate).endOf("month");
      break;
    case "season_begin":
      newPeriod.startDate = dayjs(clientDate).startOf("quarter");
      newPeriod.endDate = dayjs(clientDate);
      break;
    case "year_begin":
      newPeriod.startDate = dayjs(clientDate).startOf("year");
      newPeriod.endDate = dayjs(clientDate);
      break;
    case "last_30_days":
      newPeriod.startDate = dayjs(clientDate).subtract(29, "day");
      newPeriod.endDate = dayjs(clientDate);
      break;
    case "last_180_days":
      newPeriod.startDate = dayjs(clientDate).subtract(179, "day");
      newPeriod.endDate = dayjs(clientDate);
      break;
    case "last_365_days":
      newPeriod.startDate = dayjs(clientDate).subtract(364, "day");
      newPeriod.endDate = dayjs(clientDate);
      break;
    case "all_time":
      let startDate;
      const today = dayjs().format("YYYY-MM-DD");
      if (clientStartDate > today) {
        startDate = today;
      } else {
        startDate = clientStartDate;
      }
      newPeriod.startDate = dayjs(startDate);
      newPeriod.endDate = dayjs(clientDate);
      break;
    case "date":
      const [startCustomDate, endCustomDate] = date;

      newPeriod.startDate = startCustomDate;
      newPeriod.endDate = endCustomDate;
      break;
    default:
      break;
  }

  if (newPeriod.startDate && newPeriod.endDate) {
    return {
      startDate: newPeriod.startDate.format(FORMATTED_PATTERN),
      endDate: newPeriod.endDate.format(FORMATTED_PATTERN)
    };
  }
};

export const getDateArrayFromRange = (dateRange: DateRangeType) => {
  return [dayjs(dateRange.startDate), dayjs(dateRange.endDate)];
};
