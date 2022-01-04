import { Dayjs } from "dayjs";
import { fiscalCalendar } from "../fiscalCalendar";

type CalendarType = "fiscal" | "iso-8601";

class Calendar {
  type: CalendarType;
  startMonth: number;
  startWeek: number;
  setCalendarInfo(
    type: CalendarType,
    startMonth: number,
    startWeek: number,
    pattern: string
  ) {
    this.type = type;
    this.startMonth = startMonth - 1;
    this.startWeek = startWeek === 7 ? 0 : startWeek;

    if (type === "fiscal") {
      fiscalCalendar.setCalendarInfo(startMonth, startWeek, pattern);
    }
  }

  getStartOfYear(date: Dayjs) {
    if (this.type === "fiscal") {
      return fiscalCalendar.getStartOfYear(date);
    }
    if (calendarInfo.startMonth > date.month()) {
      date = date.year(date.year() - 1);
    }
    return date.month(calendarInfo.startMonth).date(1);
  }
}

export const calendarInfo = new Calendar();
