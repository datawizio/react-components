import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DATE_FORMATS } from "../../utils/dateFormat/constants";
import { DateType } from "./types";

dayjs.extend(customParseFormat);

export function genPrevPeriod(
  date_from: DateType,
  date_to: DateType,
  format: string = DATE_FORMATS.DATE
): [DateType, DateType] {
  if (!date_from || !date_to) return [null, null];

  const delta = dayjs(date_to, format).diff(dayjs(date_from, format), "d");

  const prev_date_to = dayjs(date_to, format)
    .subtract(delta + 1, "d")
    .format(DATE_FORMATS.DATE);

  const prev_date_from = dayjs(prev_date_to, DATE_FORMATS.DATE)
    .subtract(delta, "d")
    .format(DATE_FORMATS.DATE);

  return [prev_date_from, prev_date_to];
}
