import React, { useContext, useMemo } from "react";
import dayjs from "dayjs";
import ConfigContext from "../ConfigProvider/context";
import { capitalize } from "../../utils/text";
import "./index.less";

interface StatusDataProps {
  inProcess: boolean;
  lastUpdateDate: string | null;
}

const StatusData: React.FC<StatusDataProps> = ({
  inProcess,
  lastUpdateDate
}) => {
  const { translate } = useContext(ConfigContext);

  return useMemo(() => {
    if (inProcess) {
      return (
        <div className="StatusData__container">
          <p>{translate("DATA_IN_PROGRESS")}</p>
        </div>
      );
    }

    if (lastUpdateDate) {
      let output;

      const dateFormat = "DD.MM.YYYY";
      const timeFormat = "HH:mm";

      const today = dayjs().format(dateFormat);
      const yesterday = dayjs().subtract(1, "day").format(dateFormat);

      const date = dayjs(lastUpdateDate).format(dateFormat);
      const time = dayjs(lastUpdateDate).format(timeFormat);

      switch (date) {
        case today:
          output = `${capitalize(translate("TODAY"))} ${translate(
            "AT"
          )} ${time}`;
          break;
        case yesterday:
          output = `${capitalize(translate("YESTERDAY"))} ${translate(
            "AT"
          )} ${time}`;
          break;
        default:
          output = `${date} ${time}`;
      }

      return (
        <div className="StatusData__container">
          <p>{output}</p>
          <p>{translate("LAST_UPDATE_DATA")}</p>
        </div>
      );
    }

    return null;
  }, [translate, inProcess, lastUpdateDate]);
};

export default StatusData;
