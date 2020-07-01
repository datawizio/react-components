import React, { useContext } from "react";

import { Result } from "antd";

import ConfigContext from "../ConfigProvider/context";

const Forbidden = () => {
  const { translate } = useContext(ConfigContext);
  return (
    <div className="result-container">
      <Result
        status="403"
        title="403"
        subTitle={translate("SERVICE_FORBIDDEN")}
      />
    </div>
  );
};

export default Forbidden;
