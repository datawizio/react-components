import React, { useMemo, useContext } from "react";

import { Layout as AntLayout } from "antd";
import ConfigContext from "../ConfigProvider/context";

import "./index.less";

const AppFooter = () => {
  const year = useMemo(() => new Date().getFullYear(), []);
  const { translate } = useContext(ConfigContext);

  return (
    <AntLayout.Footer className="main-footer">
      {translate("COPYRIGHT", { year })}
    </AntLayout.Footer>
  );
};

export default AppFooter;
