import dayjs from "dayjs";
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
