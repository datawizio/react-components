import React, { useContext } from "react";
import ConfigContext from "../ConfigProvider/context";
import { formatDateTime } from "../../utils/date";
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

  if (inProcess) {
    return (
      <div className="StatusData__container">
        <p>{translate("DATA_IN_PROGRESS")}</p>
      </div>
    );
  }

  if (lastUpdateDate) {
    const formattedDateTime = formatDateTime(lastUpdateDate, translate);
    return (
      <div className="StatusData__container">
        <p>{formattedDateTime}</p>
        <p>{translate("LAST_UPDATE_DATA")}</p>
      </div>
    );
  }

  return null;
};

export default StatusData;
