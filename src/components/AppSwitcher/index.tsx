import React, { useContext, useMemo } from "react";
import { Dropdown, Row, Col } from "antd";
import Icon from "@ant-design/icons";

import "./index.less";
import ConfigContext from "../ConfigProvider/context";
import clsx from "clsx";

export interface IApplication {
  app_id: number | string;
  name: string;
  description: string;

  logo?: string;
  host: string;
  path: string | null;
  icon?: string;
  allowed?: boolean;
  clients?: { id: number; name: string }[];
  showButton?: boolean;
}

const App: React.FC<IApplication & { client: number }> = ({
  client,
  name,
  host,
  icon,
  path
}) => {
  const handleClick = () => {
    const url = `${host}${path ? path : ""}`;
    window.open(url.replace(":client_id", client.toString()), "_blank");
  };

  return (
    <Col span={8} onClick={handleClick}>
      <div className="logo">
        <div>
          <img src={icon} alt={name} />
        </div>
      </div>
      <div className="title">{name}</div>
    </Col>
  );
};

const menu = (apps: IApplication[], client: number) => (
  <div className="app-switcher-container">
    <Row>
      {apps.map(app => (
        <App {...app} client={client} key={app.app_id} />
      ))}
    </Row>
  </div>
);

const AppSwitcherSvg = () => (
  <svg className="app-switcher-icon" focusable="false" viewBox="0 0 24 24">
    <path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path>
  </svg>
);

const AppSwitcherIcon = () => <Icon component={AppSwitcherSvg} />;

export interface IAppSwitcher {
  apps: IApplication[];
  client: number;
  theme?: "dark" | "light";
}

const AppSwitcher: React.FC<IAppSwitcher> = ({ apps, client, theme }) => {
  const overlay = useMemo(() => {
    return menu(apps, client);
  }, [apps, client]);
  const { translate } = useContext(ConfigContext);
  const className = clsx({
    "app-switcher-link": true,
    "dw-dark": theme === "dark"
  });
  return (
    <>
      <Dropdown overlay={overlay} trigger={["click"]} placement="bottomCenter">
        <a
          href="#1"
          className={className}
          onClick={e => e.preventDefault()}
          title={translate("CHANGE_APP_BTN_TITLE")}
        >
          <AppSwitcherIcon />
        </a>
      </Dropdown>
      <div className="divider"></div>
    </>
  );
};

export default AppSwitcher;
