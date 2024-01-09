import dayjs, { Dayjs } from "dayjs";
import dayjsGenerateConfig from "rc-picker/es/generate/dayjs";
import { GenerateConfig } from "rc-picker/es/generate";
import { fiscalCalendar } from "../../../utils/fiscalCalendar";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

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

interface IFiscalCalendarConfig extends GenerateConfig<Dayjs> {
  getMonths?: (locale: string) => string[];
  type?: "fiscal";
  getStartOfMonth?: (date: Dayjs) => Dayjs;
  getMonthWeeksCount?: (date: Dayjs) => number;
  getNextMonth?: (date: Dayjs, offset: number) => Dayjs;
}

export const fiscalCalendarConfig: IFiscalCalendarConfig = Object.assign(
  {},
  dayjsGenerateConfig
);
fiscalCalendarConfig.locale = Object.assign({}, dayjsGenerateConfig.locale);

fiscalCalendarConfig.getEndDate = date => fiscalCalendar.getEndDate(date);

fiscalCalendarConfig.type = "fiscal";

fiscalCalendarConfig.getYear = date => fiscalCalendar.getYear(date);

fiscalCalendarConfig.getMonth = date => fiscalCalendar.getMonth(date);

fiscalCalendarConfig.getStartOfMonth = date =>
  fiscalCalendar.getStartOfMonth(date);

fiscalCalendarConfig.getMonthWeeksCount = date =>
  fiscalCalendar.getMonthWeeksCount(date);

fiscalCalendarConfig.getNextMonth = (date, offset) =>
  fiscalCalendar.getNextMonth(date, offset);

fiscalCalendarConfig.locale.format = (locale, date, format) => {
  if (format === "YYYY") {
    let y = fiscalCalendar.getYear(date);

    fiscalCalendar.calendar &&
      Object.entries(fiscalCalendar.calendar).forEach(([key, value]: any) => {
        if (date.isBetween(value.from, value.to, "day")) {
          y = Number(key);
        }
      });

    const y2 = y + 1;
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

//@ts-ignore
fiscalCalendarConfig.locale.getMonths = locale => {
  //@ts-ignore
  const months = dayjs().locale(parseLocale(locale)).localeData().months();
  const res = [];
  for (let i = 0; i < 12; i++) {
    res.push(months[(fiscalCalendar.startMonth + i) % 12]);
  }
  return res;
};
