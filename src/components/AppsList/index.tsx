import React, { useContext } from "react";
import ConfigContext from "../ConfigProvider/context";
import { Row } from "antd";
import { App } from "./App";
import { AppsLoader } from "./AppsLoader";
import "./index.less";

export interface IApp {
  app_id: number | string;
  name: string;
  logo: string;
  dark_logo: string;
  host: string;
  path: string;
  description: string;
  clients?: {
    id: number;
    name: string;
    is_active: boolean;
    client_id?: number;
  }[];
  allowed?: boolean;
}

export interface AppsListProps {
  apps: IApp[];
  loading?: boolean;
  onSelect?: (clientId: number, params: any) => void;
  disabledApps?: number[];
}

const AppsList: React.FC<AppsListProps> = ({
  apps,
  loading,
  onSelect,
  disabledApps
}) => {
  const { translate } = useContext(ConfigContext);

  const handleButtonClick = React.useCallback(
    (clientId: number, params: any) => {
      onSelect(clientId, params);
    },
    [onSelect]
  );

  return (
    <Row className="row-apps">
      {loading ? (
        <AppsLoader />
      ) : apps.length > 0 ? (
        apps.map(app => (
          <App
            key={app.app_id}
            {...app}
            disabledApps={disabledApps}
            onButtonClick={handleButtonClick}
          />
        ))
      ) : (
        <div className="no-apps">{translate("HAVENT_APPS")}</div>
      )}
    </Row>
  );
};

export default AppsList;
