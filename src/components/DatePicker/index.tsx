import React from "react";

import { Dayjs } from "dayjs";

import dayjsGenerateConfig from "rc-picker/es/generate/dayjs";
import { fiscalCalendarConfig } from "./config/fiscal";
import generatePicker from "./antd/AntGeneratePicker";

import "./index.less";
import { calendarInfo } from "../../utils/calendar";

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

type IlocaleMapObject = Record<string, string>;
const localeMap: IlocaleMapObject = {
  en_GB: "en-gb",
  en_US: "en",
  zh_CN: "zh-cn",
  zh_TW: "zh-tw"
};
const parseLocale = (locale: string) => {
  const mapLocale = localeMap[locale];
  return mapLocale || locale.split("_")[0];
};

//@ts-ignore
dayjsGenerateConfig.getStartOfMonth = date =>
  dayjsGenerateConfig.setDate(date, 1);

dayjsGenerateConfig.locale.format = (locale, date, format) => {
  if (format === "YYYY" && calendarInfo.startMonth !== 0) {
    const y =
        calendarInfo.startMonth > date.month() ? date.year() - 1 : date.year(),
      y2 = y + 1;
    return `${y}/${y2}`;
  }
  return date.locale(parseLocale(locale)).format(format);
};

const DatePicker: IDatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

DatePicker.Picker = {
  "fiscal": generatePicker<Dayjs>(fiscalCalendarConfig),
  "iso-8601": generatePicker<Dayjs>(dayjsGenerateConfig)
};

export default DatePicker;

// export default DatePickerWrapper;
