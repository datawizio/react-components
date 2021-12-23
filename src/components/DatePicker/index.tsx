import React from "react";

import { Dayjs } from "dayjs";

import dayjsGenerateConfig from "rc-picker/es/generate/dayjs";
import { fiscalCalendarConfig } from "./config/fiscal";
import generatePicker from "./antd/AntGeneratePicker";

import "./index.less";

export type CalendarTypes = "fiscal" | "iso-8601";
export interface DatePickerWrapperProps {
  type?: CalendarTypes;
}

type DatePickerPickers = { [key: string]: ReturnType<typeof generatePicker> };
interface IDatePicker extends ReturnType<typeof generatePicker> {
  Picker?: DatePickerPickers;
}

dayjsGenerateConfig.isAfter = (date1, date2) => {
  // console.log(date1, date2, date1.isAfter(date2));
  return date1.isAfter(date2);
};
//@ts-ignore
dayjsGenerateConfig.getStartOfMonth = date =>
  dayjsGenerateConfig.setDate(date, 1);

const DatePicker: IDatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

DatePicker.Picker = {
  "fiscal": generatePicker<Dayjs>(fiscalCalendarConfig),
  "iso-8601": generatePicker<Dayjs>(dayjsGenerateConfig)
};

export default DatePicker;

// export default DatePickerWrapper;
