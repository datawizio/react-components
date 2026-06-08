import React, { useMemo, useContext } from "react";
import clsx from "clsx";
import { Layout as AntLayout } from "antd";
import ConfigContext from "../ConfigProvider/context";
import "./index.less";

interface AppFooterProps {
  text?: string;
  withLogo?: boolean;
}

const AppFooter: React.FC<AppFooterProps> = ({ text, withLogo }) => {
  const year = useMemo(() => new Date().getFullYear(), []);
  const { translate } = useContext(ConfigContext);

  return (
    <AntLayout.Footer
      className={clsx("main-footer", withLogo && "main-footer--with-logo")}
    >
      {text || translate("COPYRIGHT", { year })}
    </AntLayout.Footer>
  );
};

export default AppFooter;
