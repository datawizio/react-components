import dayjs from "dayjs";
import i18n from "i18next";
import { capitalize } from "./text";

export const formatDateTime = (dateOrigin, translate) => {
  let output;

  const dateFormat = "DD.MM.YYYY";
  const timeFormat = "HH:mm";

  const today = dayjs().format(dateFormat);
  const yesterday = dayjs().subtract(1, "day").format(dateFormat);

  const date = dayjs(dateOrigin).format(dateFormat);
  const time = dayjs(dateOrigin).format(timeFormat);

  switch (date) {
    case today:
      output = `${capitalize(translate("TODAY"))} ${translate("AT")} ${time}`;
      break;
    case yesterday:
      output = `${capitalize(translate("YESTERDAY"))} ${translate(
        "AT"
      )} ${time}`;
      break;
    default:
      output = `${date} ${time}`;
  }

  return output;
};

export const generateDays = (count: number = 31) => {
  return new Array(count).fill(0).map((item, idx) => {
    return {
      value: idx + 1,
      label: String(idx + 1)
    };
  });
};

export const monthsList = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER"
];

export const generateMonths = () => {
  return monthsList.map((month, idx) => {
    return {
      value: idx + 1,
      label: String(i18n.t(month))
    };
  });
};

export const generateYears = (count: number = 100) => {
  let currentYear = new Date().getFullYear();
  let result = [];
  for (let i = 0; i < count; i++) {
    result.push({
      label: currentYear,
      value: String(currentYear)
    });
    currentYear--;
  }
  return result;
};
