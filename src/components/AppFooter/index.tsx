import React, { useMemo, useContext } from "react";
import { Layout as AntLayout } from "antd";
import ConfigContext from "../ConfigProvider/context";
import "./index.less";

interface AppFooterProps {
  text?: string;
}

const AppFooter: React.FC<AppFooterProps> = ({ text }) => {
  const year = useMemo(() => new Date().getFullYear(), []);
  const { translate } = useContext(ConfigContext);

  return (
    <AntLayout.Footer className="main-footer">
      {text || translate("COPYRIGHT", { year })}
    </AntLayout.Footer>
  );
};

export default AppFooter;
