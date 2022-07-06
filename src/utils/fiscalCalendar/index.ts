import dayjs, { Dayjs } from "dayjs";
const format = "DD-MM-YYYY";

class FiscalCalendar {
  DAYS_IN_YEAR = 364;
  DAYS_IN_QUARTAL = (4 + 4 + 5) * 7;
  pattern: number[] = [4, 4, 5];
  calendar = {};
  startDate: Dayjs;
  startMonth: number;
  startWeek: number;

  constructor(startDate: Dayjs, pattern: string) {
    this.startDate = startDate;
    this.pattern = pattern.split("-").map(i => parseInt(i));
  }

  setCalendarInfo(startMonth: number, startWeek: number, pattern: string) {
    this.startMonth = startMonth - 1;
    this.startWeek = startWeek === 7 ? 0 : startWeek;
    this.startDate = dayjs()
      .date(1)
      .month(this.startMonth)
      .hour(0)
      .minute(0)
      .second(0);

    if (dayjs().month() < this.startMonth) {
      this.startDate = this.startDate.subtract(1, "year");
    }

    while (this.startDate.day() !== this.startWeek) {
      this.startDate = this.startDate.subtract(1, "day");
    }

    this.pattern = pattern.split("-").map(i => parseInt(i));

    this.calendar = {};
  }

  getEndDate(date: Dayjs) {
    if (isNaN(date.month())) return date;
    const month = this.getMonth(date) + 1;
    const quater = Math.ceil(month / 3);
    const res = month - (quater - 1) * 3;
    let dayInYear = ((quater - 1) * this.DAYS_IN_QUARTAL) - 1;
    for (let i = 0; i < res; i++) {
      dayInYear += this.pattern[i] * 7;
    }
    return this.startDate.add(dayInYear, "day");
  }

  getMonth(date: Dayjs | null) {
    const yearNumber = this.getYear(date);

    const year = this.calendar[yearNumber];

    const dayInYear = date.diff(year.from, "day") + 1;

    let quartal = Math.ceil(dayInYear / this.DAYS_IN_QUARTAL);
    if (quartal > 4) quartal = 4;
    const dayInQuartal = dayInYear - (quartal - 1) * this.DAYS_IN_QUARTAL;

    let temp = dayInQuartal;
    let month = 0;
    const pattern = [...this.pattern];
    if (year.weeks === 53 && quartal === 4) {
      pattern[2]++;
    }

    for (let p of pattern) {
      if (temp - p * 7 <= 0) return (quartal - 1) * 3 + month;
      temp -= p * 7;
      month++;
    }

    return (quartal - 1) * 3 + month;
  }

  getMonthWeeksCount(date: Dayjs) {
    const month = this.getMonth(date);

    let weeks = this.pattern[month % 3];

    if (month === 11) {
      const yearNumber = this.getYear(date);
      const year = this.calendar[yearNumber];

      if (year.weeks === 53) weeks++;
    }
    return weeks;
  }

  getNextMonth(date: Dayjs, offset: number) {
    // return date.month();
    let yearNumber = this.getYear(date);

    let month = this.getMonth(date) + offset;

    if (month > 11) {
      month = month % 12;
      yearNumber++;
    } else if (month < 0) {
      month = 12 + month;
      yearNumber--;
    }
    return this.getStartOfMonthByNumber(yearNumber, month);
  }

  getStartOfMonth(date: Dayjs) {
    if (isNaN(date.month())) return date;
    const month = this.getMonth(date);
    const year = this.getYear(date);
    return this.getStartOfMonthByNumber(year, month);
  }

  getStartOfMonthByNumber(year: number, month: number) {
    const obj = this.getYearObject(year);
    const quater = Math.ceil(month / 3);
    const res = month - (quater - 1) * 3;
    let dayInYear = (quater - 1) * this.DAYS_IN_QUARTAL;
    for (let i = 0; i < res; i++) {
      dayInYear += this.pattern[i] * 7;
    }
    const startDate = dayjs(obj.from);
    return startDate.add(dayInYear, "day");
  }

  getQuater(date: Dayjs) {
    if (isNaN(date.month())) return 0;
    const month = this.getMonth(date);
    return Math.floor(month / 3);
  }

  getStartOfQuater(date: Dayjs) {
    if (isNaN(date.month())) return date;
    const quater = this.getQuater(date);
    const yearNumber = this.getYear(date);
    const dayInYear = quater * this.DAYS_IN_QUARTAL;
    const startYear = dayjs(this.calendar[yearNumber].from);
    return startYear.add(dayInYear, "day");
  }

  getStartOfYear(date: Dayjs) {
    if (isNaN(date.month())) return date;
    const yearNumber = this.getYear(date);
    return dayjs(this.calendar[yearNumber].from);
  }

  getYearObject(year: number) {
    if (!this.calendar[year]) this._generateCalendar(year);
    return this.calendar[year];
  }

  getYear(date: Dayjs) {
    let year = date.year();
    const checks = [0, 1, -1];
    for (let c of checks) {
      if (this.checkDateInYear(year + c, date)) {
        return year + c;
      }
    }
  }

  checkDateInYear(year: number, date: Dayjs) {
    if (!this.calendar[year]) this._generateCalendar(year);
    const from = dayjs(this.calendar[year].from).hour(0).minute(0);
    const to = dayjs(this.calendar[year].to).hour(23).minute(59);
    return (
      (from.isBefore(date) || from.isSame(date)) &&
      (date.isBefore(to) || date.isSame(to))
    );
  }

  presetCurrentMonth(maxDate = null) {
    const min = maxDate
      ? this.getStartOfMonth(dayjs(maxDate, format))
      : this.getStartOfMonth(dayjs());
    const max = maxDate ? dayjs(maxDate, format) : dayjs();
    return [min, max];
  }

  presetCurrentQuater(maxDate = null) {
    const min = maxDate
      ? this.getStartOfQuater(dayjs(maxDate, format))
      : this.getStartOfQuater(dayjs());
    const max = maxDate ? dayjs(maxDate, format) : dayjs();
    return [min, max];
  }

  presetCurrentYear(maxDate = null) {
    const min = maxDate
      ? this.getStartOfYear(dayjs(maxDate, format))
      : this.getStartOfYear(dayjs());
    const max = maxDate ? dayjs(maxDate, format) : dayjs();
    return [min, max];
  }

  is53WeeksYear(year) {
    if (!this.calendar[year]) this._generateCalendar(year);
    return this.calendar[year].weeks === 53;
  }

  isDateInLastWeek(date = null) {
    const year = this.getYear(date);
    const max = dayjs(this.calendar[year].to);
    const min = max.subtract(7, "day");

    return min.isBefore(date) && (date.isBefore(max) || date.isSame(max));
  }

  prevLastQuarter(dateFrom = null, dateTo = null) {
    let dateFromDays = 91;
    let dateToDays = 91;

    if (dateFrom) {
      const dateFromDay = dayjs(dateFrom, format);
      const dateFromYear = dateFrom ? this.getYear(dateFromDay) : 0;
      if (
        (this.is53WeeksYear(dateFromYear) &&
          this.isDateInLastWeek(dateFromDay)) ||
        (this.is53WeeksYear(dateFromYear - 1) &&
          this.getQuater(dateFromDay) === 1)
      ) {
        dateFromDays = 98;
      }
    }
    if (dateTo) {
      const dateToDay = dayjs(dateTo, format);
      const dateToYear = dateTo ? this.getYear(dateToDay) : 0;
      if (
        (this.is53WeeksYear(dateToYear) && this.isDateInLastWeek(dateToDay)) ||
        (this.is53WeeksYear(dateToYear - 1) && this.getQuater(dateToDay) === 1)
      ) {
        dateToDays = 98;
      }
    }
    const min = dayjs(dateFrom, format).subtract(dateFromDays, "days");
    const max = dayjs(dateTo, format).subtract(dateToDays, "days");
    return [min, max];
  }

  prevLastYear(dateFrom = null, dateTo = null) {
    let dateFromDays = 364;
    let dateToDays = 364;

    if (dateFrom) {
      const dateFromDay = dayjs(dateFrom, format);
      const dateFromYear = dateFrom ? this.getYear(dateFromDay) : 0;
      if (
        (this.is53WeeksYear(dateFromYear) &&
          this.isDateInLastWeek(dateFromDay)) ||
        (this.is53WeeksYear(dateFromYear - 1) &&
          this.getQuater(dateFromDay) === 1)
      ) {
        dateFromDays = 371;
      }
    }
    if (dateTo) {
      const dateToDay = dayjs(dateTo, format);
      const dateToYear = dateTo ? this.getYear(dateToDay) : 0;
      if (
        (this.is53WeeksYear(dateToYear) && this.isDateInLastWeek(dateToDay)) ||
        (this.is53WeeksYear(dateToYear - 1) && this.getQuater(dateToDay) === 1)
      ) {
        dateToDays = 371;
      }
    }
    const min = dayjs(dateFrom, format).subtract(dateFromDays, "days");
    const max = dayjs(dateTo, format).subtract(dateToDays, "days");
    return [min, max];
  }

  _generateCalendar(year: number) {
    let arr = [];
    let clone = this.startDate.clone();
    const diff = year - clone.year();

    // const obj = {};
    const startYear = clone.year();

    if (diff < 0) {
      for (let i = 1; i <= Math.abs(diff); i++) {
        const current = startYear - i;
        if (this.calendar[current]) {
          clone = dayjs(this.calendar[current].from);
          continue;
        }
        clone = clone.add(-1, "day");
        this.calendar[current] = {
          from: "",
          to: clone.format("YYYY-MM-DD"),
          weeks: 52
        };
        clone = clone.add(-(this.DAYS_IN_YEAR - 1), "day");
        if (clone.add(-1, "day").get("month") === this.startMonth) {
          clone = clone.add(-7, "day");
          this.calendar[current].weeks = 53;
        }
        this.calendar[current].from = clone.format("YYYY-MM-DD");
        // start = start.add(-1, "day");
      }
    } else {
      for (let i = 0; i <= diff; i++) {
        const current = startYear + i;
        if (this.calendar[current]) {
          clone = dayjs(this.calendar[current].to).add(1, "day");
          continue;
        }
        this.calendar[current] = {
          from: clone.format("YYYY-MM-DD"),
          to: "",
          weeks: 52
        };
        clone = clone.add(this.DAYS_IN_YEAR - 1, "day");
        if (
          clone.month() === this.startMonth - 1 &&
          clone.add(7, "day").month() === this.startMonth - 1
        ) {
          clone = clone.add(7, "day");
          this.calendar[current].weeks = 53;
        }
        this.calendar[current].to = clone.format("YYYY-MM-DD");
        clone = clone.add(1, "day");
      }
    }
  }
}

export const fiscalCalendar = new FiscalCalendar(dayjs("2021-01-31"), "4-4-5");
