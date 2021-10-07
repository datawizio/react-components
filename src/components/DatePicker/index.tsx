import React from "react";

import dayjs, { Dayjs } from "dayjs";

import dayjsGenerateConfig from "rc-picker/es/generate/dayjs";
import generatePicker from "./antd/AntGeneratePicker";

import { retailCalendar } from "../../utils/retailCalendar";
import "./index.less";

export type CalendarTypes = "retail" | "general";
export interface DatePickerWrapperProps {
  type?: CalendarTypes;
}

type DatePickerPickers = { [key: string]: ReturnType<typeof generatePicker> };
interface IDatePicker extends ReturnType<typeof generatePicker> {
  Picker?: DatePickerPickers;
}

const retailCalendarConfig = Object.assign({}, dayjsGenerateConfig);
dayjsGenerateConfig.isAfter = (date1, date2) => {
  // console.log(date1, date2, date1.isAfter(date2));
  return date1.isAfter(date2);
};
//@ts-ignore
dayjsGenerateConfig.getStartOfMonth = date =>
  dayjsGenerateConfig.setDate(date, 1);

retailCalendarConfig.getEndDate = date => retailCalendar.getEndDate(date);

retailCalendarConfig.getYear = date => retailCalendar.getYear(date);

retailCalendarConfig.getMonth = date =>
  (retailCalendar.getMonth(date) + 1) % 12;
//@ts-ignore
retailCalendarConfig.getStartOfMonth = date =>
  retailCalendar.getStartOfMonth(date);

//@ts-ignore
retailCalendarConfig.getMonthWeeksCount = date =>
  retailCalendar.getMonthWeeksCount(date);
//@ts-ignore
retailCalendarConfig.getNextMonth = (date, offset) =>
  retailCalendar.getNextMonth(date, offset);

const DatePicker: IDatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

DatePicker.Picker = {
  "retail": generatePicker<Dayjs>(retailCalendarConfig),
  "general": generatePicker<Dayjs>(dayjsGenerateConfig)
};

export default DatePicker;

// export default DatePickerWrapper;
