import dayjs from "dayjs";
import dayjsGenerateConfig from "rc-picker/es/generate/dayjs";

import { fiscalCalendar } from "../../../utils/fiscalCalendar";

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

export const fiscalCalendarConfig = Object.assign({}, dayjsGenerateConfig);
fiscalCalendarConfig.locale = Object.assign({}, dayjsGenerateConfig.locale);

fiscalCalendarConfig.getEndDate = date => fiscalCalendar.getEndDate(date);

//@ts-ignore
fiscalCalendarConfig.type = "fiscal";

fiscalCalendarConfig.getYear = date => fiscalCalendar.getYear(date);

fiscalCalendarConfig.getMonth = date => fiscalCalendar.getMonth(date);
//@ts-ignore
fiscalCalendarConfig.getStartOfMonth = date =>
  fiscalCalendar.getStartOfMonth(date);

//@ts-ignore
fiscalCalendarConfig.getMonthWeeksCount = date =>
  fiscalCalendar.getMonthWeeksCount(date);

//@ts-ignore
fiscalCalendarConfig.getNextMonth = (date, offset) =>
  fiscalCalendar.getNextMonth(date, offset);

fiscalCalendarConfig.locale.format = (locale, date, format) => {
  if (format === "YYYY") {
    const y = fiscalCalendar.getYear(date),
      y2 = y + 1;
    return `${y}/${y2}`;
  }
  return date.locale(parseLocale(locale)).format(format);
};

fiscalCalendarConfig.locale.getShortMonths = locale => {
  //@ts-ignore
  const months = dayjs().locale(parseLocale(locale)).localeData().monthsShort();
  const res = [];
  for (let i = 0; i < 12; i++) {
    res.push(months[(fiscalCalendar.startMonth + i) % 12]);
  }
  return res;
};
