import { ClientDateFormat } from "./index";

const fullDate = new ClientDateFormat();
const fullDateWithDots = new ClientDateFormat(undefined, { separator: "." });
const yearMonthDate = new ClientDateFormat({ year: "YYYY", month: "MM" });

const STATIC_DATE_FORMATS = {
  DATE: () => `${fullDate}`,
  DATE_WITH_DOTS: () => `${fullDateWithDots}`,
  DATE_TIME: () => `${fullDate} HH:mm:ss`,
  DATE_TIME_SHORT: () => `${fullDate} HH:mm`,
  DATE_TIME_WITH_PIPE: () => `${fullDate} | HH:mm`,
  YEAR: () => "YYYY",
  YEAR_MONTH: () => `${yearMonthDate}`,
  API_DATE: () => "YYYY-MM-DD",
  API_DATE_TIME: () => "YYYY-MM-DD HH:mm:ss"
};

export type DateFormatDict = {
  [K in keyof typeof STATIC_DATE_FORMATS]: string;
};

// Here we use a `Proxy` to retrieve the correct date format value every time the property is accessed.
// This is useful when `ClientDateFormat.order` changes dynamically
// and we want to display the latest updated value without reloading the page.
export const DATE_FORMATS = (new Proxy(STATIC_DATE_FORMATS, {
  get(target, prop, receiver) {
    const value = Reflect.get(target, prop, receiver);
    return typeof value === "function" ? value.call(this) : value;
  }
}) as unknown) as DateFormatDict;
