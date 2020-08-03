import React, { useContext, useCallback } from "react";

import { Result } from "antd";
import Button from "../Button";

import ConfigContext from "../ConfigProvider/context";

export interface ForbiddenProps {
  backUrl: string;
}

const Forbidden = ({ backUrl }) => {
  const { translate } = useContext(ConfigContext);

  const handleButtonClick = useCallback(() => {
    window.location.href = backUrl;
    window.localStorage.removeItem("datawiz_auth_refresh_token");
    window.localStorage.removeItem("datawiz_auth_access_token");
  }, [backUrl]);

  return (
    <div className="result-container">
      <Result
        status="403"
        subTitle={translate("SERVICE_FORBIDDEN")}
        extra={
          <Button type="primary" onClick={handleButtonClick} href={backUrl}>
            {translate("BACK_TO_ACCOUNT")}
          </Button>
        }
      />
    </div>
  );
};

export default Forbidden;
