import React, { useContext } from "react";

import { Result } from "antd";
import Button from "../Button";

import ConfigContext from "../ConfigProvider/context";

export interface ForbiddenProps {
  backUrl: string;
}

const Forbidden = ({ backUrl }) => {
  const { translate } = useContext(ConfigContext);

  return (
    <div className="result-container">
      <Result
        status="403"
        subTitle={translate("SERVICE_FORBIDDEN")}
        extra={
          <Button type="primary" href={backUrl}>
            {translate("BACK_TO_ACCOUNT")}
          </Button>
        }
      />
    </div>
  );
};

export default Forbidden;
