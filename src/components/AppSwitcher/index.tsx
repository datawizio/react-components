import React, { useContext, useMemo } from "react";
import { Col, Dropdown, Row, Typography } from "antd";
import Icon from "@ant-design/icons";

import "./index.less";
import ConfigContext from "../ConfigProvider/context";
import clsx from "clsx";

export interface IApplication {
  app_id: number | string;
  name: string;
  description: string;
  bento_menu_description: string;
  is_main: boolean;

  logo?: string;
  host: string;
  path: string | null;
  icon?: string;
  dark_icon?: string;
  allowed?: boolean;
  clients?: { id: number; name: string }[];
  showButton?: boolean;
}

const App: React.FC<
  IApplication & { client: number; onAppClick?: (app: string) => void }
> = ({
  client,
  name,
  bento_menu_description,
  host,
  icon,
  dark_icon,
  path,
  onAppClick
}) => {
  const handleClick = () => {
    const url = `${host}${path ? path : ""}`;
    window.open(url.replace(":client_id", client.toString()), "_blank");
    onAppClick && onAppClick(name);
  };

  return (
    <Col span={24} onClick={handleClick} flex="1">
      <div className="logo">
        <img src={window.theme === "dark" ? dark_icon : icon} alt={name} />
      </div>

      <div className="text">
        <Typography.Paragraph>{name}</Typography.Paragraph>
        <Typography.Paragraph>{bento_menu_description}</Typography.Paragraph>
      </div>
    </Col>
  );
};

const menu = (
  apps: IApplication[],
  client: number,
  onAppClick?: (app: string) => void
) => {
  const mainApps = apps.filter(item => item.is_main);
  const otherApps = apps.filter(item => !item.is_main);

  return (
    <Row className="app-switcher-container">
      {mainApps.map(app => (
        <App
          {...app}
          client={client}
          key={app.app_id}
          onAppClick={onAppClick}
        />
      ))}

      <span className="other-apps-title">Перейти до</span>

      {otherApps.map(app => (
        <App
          {...app}
          client={client}
          key={app.app_id}
          onAppClick={onAppClick}
        />
      ))}
    </Row>
  );
};

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
  onAppClick?: (app: string) => void;
}

const AppSwitcher: React.FC<IAppSwitcher> = ({
  apps,
  client,
  theme,
  onAppClick
}) => {
  const { translate } = useContext(ConfigContext);

  const overlay = useMemo(() => {
    return menu(apps, client, onAppClick);
  }, [apps, client, onAppClick]);

  const className = clsx({
    "app-switcher-link": true,
    "dw-dark": theme === "dark"
  });

  return (
    <>
      <Dropdown
        overlay={overlay}
        trigger={["click"]}
        placement="bottomCenter"
        overlayClassName="AppSwitcher__dropdown"
      >
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
