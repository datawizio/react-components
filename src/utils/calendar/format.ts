import { Dayjs } from "dayjs";
import { fiscalCalendar } from "../fiscalCalendar";

export const formatYYYYMMFiscal = (date: Dayjs) => {
  let month = fiscalCalendar.getMonth(date) + fiscalCalendar.startMonth + 1;
  let year = fiscalCalendar.getYear(date);

  if (month > 12) {
    year++;
    month -= 12;
  }

  if (month === 0) month = 12;
  return `${year}-${month < 10 ? "0" : ""}${month}`;
};

// export const fromYYYYMMFiscalToDate = (date: string) => {
//   const parts = date.split("-");
//   let year = parseInt(parts[0], 10);
//   const month = parseInt(parts[1], 10);
//   if (month < fiscalCalendar.startMonth) {
//     year--;
//   }
//   return `${year}-${month < 10 ? "0" : ""}${month}`;
// };
