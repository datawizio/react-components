import React, { FC, useContext } from "react";

import ConfigContext from "../ConfigProvider/context";

import { Row } from "antd";
import { App } from "./App";
import { AppsLoader } from "./AppsLoader";
import { AppsListProps, onAppClick } from "./types";

import "./index.less";

const AppsList: FC<AppsListProps> = ({ apps, loading, onSelect }) => {
  const { translate } = useContext(ConfigContext);

  const handleButtonClick = React.useCallback<onAppClick>(
    (clientId, params) => {
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
          <App key={app.app_id} {...app} onButtonClick={handleButtonClick} />
        ))
      ) : (
        <div className="no-apps">{translate("HAVENT_APPS")}</div>
      )}
    </Row>
  );
};

export default AppsList;
