import { DECADE_UNIT_DIFF } from "rc-picker/lib/panels/DecadePanel/index";
import type { GenerateConfig } from "rc-picker/lib/generate";
import type {
  PickerMode,
  NullableDateType,
  PanelMode
} from "rc-picker/lib/interface";

import { isNullEqual } from "rc-picker/lib/utils/dateUtil";

export function getWeekStartDate<DateType>(
  locale: string,
  generateConfig: GenerateConfig<DateType>,
  value: DateType
) {
  const weekFirstDay = generateConfig.locale.getWeekFirstDay(locale);
  //@ts-ignore
  const monthStartDate = generateConfig.getStartOfMonth(value, 1);
  const startDateWeekDay = generateConfig.getWeekDay(monthStartDate);

  let alignStartDate = generateConfig.addDate(
    monthStartDate,
    weekFirstDay - startDateWeekDay
  );

  if (
    generateConfig.getMonth(alignStartDate) ===
      generateConfig.getMonth(value) &&
    generateConfig.getDate(alignStartDate) > 1 &&
    //@ts-ignore
    generateConfig.type !== "fiscal"
  ) {
    alignStartDate = generateConfig.addDate(alignStartDate, -7);
  }

  return alignStartDate;
}

export function getClosingViewDate<DateType>(
  viewDate: DateType,
  picker: PickerMode,
  generateConfig: GenerateConfig<DateType>,
  offset: number = 1
): DateType {
  switch (picker) {
    case "year":
      return generateConfig.addYear(viewDate, offset * 10);
    case "quarter":
    case "month":
      return generateConfig.addYear(viewDate, offset);
    default:
      //@ts-ignore
      return generateConfig.getNextMonth
        ? //@ts-ignore
          generateConfig.getNextMonth(viewDate, offset)
        : generateConfig.addMonth(viewDate, offset);
  }
}

export function isInRange<DateType>(
  generateConfig: GenerateConfig<DateType>,
  startDate: NullableDateType<DateType>,
  endDate: NullableDateType<DateType>,
  current: NullableDateType<DateType>
) {
  if (!startDate || !endDate || !current) {
    return false;
  }

  return (
    !isSameDate(generateConfig, startDate, current) &&
    !isSameDate(generateConfig, endDate, current) &&
    generateConfig.isAfter(current, startDate) &&
    generateConfig.isAfter(endDate, current)
  );
}

export function isSameDate<DateType>(
  generateConfig: GenerateConfig<DateType>,
  date1: NullableDateType<DateType>,
  date2: NullableDateType<DateType>
) {
  const equal = isNullEqual(date1, date2);
  if (typeof equal === "boolean") {
    return equal;
  }
  return (
    date1 &&
    date2 &&
    //@ts-ignore
    date1.year() === date2.year() &&
    //@ts-ignore
    date1.month() === date2.month() &&
    //@ts-ignore
    date1.date() === date2.date()
  );
}

export function getCellDateDisabled<DateType>({
  cellDate,
  mode,
  disabledDate,
  generateConfig
}: {
  cellDate: DateType;
  mode: Omit<PanelMode, "time">;
  generateConfig: GenerateConfig<DateType>;
  disabledDate?: (date: DateType) => boolean;
}): boolean {
  if (!disabledDate) return false;
  // Whether cellDate is disabled in range
  const getDisabledFromRange = (
    currentMode: "date" | "month" | "year",
    start: number,
    end: number
  ) => {
    let current = start;
    while (current <= end) {
      let date: DateType;
      switch (currentMode) {
        case "date": {
          date = generateConfig.setDate(cellDate, current);
          if (!disabledDate(date)) {
            return false;
          }
          break;
        }
        case "month": {
          date = generateConfig.setMonth(cellDate, current);
          if (
            !getCellDateDisabled({
              cellDate: date,
              mode: "month",
              generateConfig,
              disabledDate
            })
          ) {
            return false;
          }
          break;
        }
        case "year": {
          date = generateConfig.setYear(cellDate, current);
          if (
            !getCellDateDisabled({
              cellDate: date,
              mode: "year",
              generateConfig,
              disabledDate
            })
          ) {
            return false;
          }
          break;
        }
      }
      current += 1;
    }
    return true;
  };

  const getDisabledFromRange2 = (
    currentMode: "date" | "month" | "year",
    start: any,
    end: any
  ) => {
    let current = start.clone();
    while (current <= end) {
      let date: DateType;
      switch (currentMode) {
        case "date": {
          // date = generateConfig.setDate(cellDate, current);
          if (!disabledDate(current)) {
            return false;
          }
          break;
        }
        case "month": {
          date = generateConfig.setMonth(cellDate, current);
          if (
            !getCellDateDisabled({
              cellDate: date,
              mode: "month",
              generateConfig,
              disabledDate
            })
          ) {
            return false;
          }
          break;
        }
        case "year": {
          date = generateConfig.setYear(cellDate, current);
          if (
            !getCellDateDisabled({
              cellDate: date,
              mode: "year",
              generateConfig,
              disabledDate
            })
          ) {
            return false;
          }
          break;
        }
      }
      current = current.add(1, "day");
    }
    return true;
  };
  switch (mode) {
    case "date":
    case "week": {
      return disabledDate(cellDate);
    }
    case "month": {
      //@ts-ignore
      const startDate = generateConfig.getStartOfMonth(cellDate);
      const endDate =
        //  generateConfig.getDate(
        generateConfig.getEndDate(cellDate);
      // );
      return getDisabledFromRange2("date", startDate, endDate);
    }
    case "quarter": {
      const startMonth = Math.floor(generateConfig.getMonth(cellDate) / 3) * 3;
      const endMonth = startMonth + 2;
      return getDisabledFromRange("month", startMonth, endMonth);
    }
    case "year": {
      return getDisabledFromRange("month", 0, 11);
    }
    case "decade": {
      const year = generateConfig.getYear(cellDate);
      const startYear = Math.floor(year / DECADE_UNIT_DIFF) * DECADE_UNIT_DIFF;
      const endYear = startYear + DECADE_UNIT_DIFF - 1;
      return getDisabledFromRange("year", startYear, endYear);
    }
  }
}
