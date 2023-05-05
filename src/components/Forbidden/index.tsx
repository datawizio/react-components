import React, { useContext, useCallback } from "react";
import { Result } from "antd";
import Button from "../Button";
import ConfigContext from "../ConfigProvider/context";
import { ForbiddenIcon } from "../Icons/ForbiddenIcon";

export interface ForbiddenProps {
  backUrl: string;
  btnText?: string;
}

const Forbidden: React.FC<ForbiddenProps> = ({ backUrl, btnText }) => {
  const { translate } = useContext(ConfigContext);

  const handleButtonClick = useCallback(() => {
    window.location.href = backUrl;
    window.localStorage.removeItem("datawiz_auth_refresh_token");
    window.localStorage.removeItem("datawiz_auth_access_token");
  }, [backUrl]);

  return (
    <div className="result-container">
      <Result
        // status="403"
        icon={<ForbiddenIcon />}
        subTitle={translate("SERVICE_FORBIDDEN")}
        extra={
          <Button type="primary" onClick={handleButtonClick}>
            {btnText ?? translate("BACK_TO_ACCOUNT")}
          </Button>
        }
      />
    </div>
  );
};

export default Forbidden;
