import React from "react";

import { Dayjs } from "dayjs";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";
import generatePicker from "antd/lib/date-picker/generatePicker";

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

retailCalendarConfig.getEndDate = date => {
  // console.log(date, calendar.getEndDate(date));
  return retailCalendar.getEndDate(date);
};

// dayjsGenerateConfig.getWeekDay = date => {
//   const clone = date.locale("en");
//   //@ts-ignore
//   return clone.weekday() + clone.localeData().firstDayOfWeek() - 1;
// };

retailCalendarConfig.getMonth = date => {
  // console.log(date.format("DD-MM-YYYY"), calendar.getMonth(date));
  return retailCalendar.getMonth(date);
  // return date.date() >= 30 ? date.month() + 1 : date.month();
};

const DatePicker: IDatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

DatePicker.Picker = {
  "retail": generatePicker<Dayjs>(retailCalendarConfig),
  "general": generatePicker<Dayjs>(dayjsGenerateConfig)
};

export default DatePicker;

// export default DatePickerWrapper;
