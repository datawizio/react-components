import React, { useContext } from "react";

import { notification } from "antd";
import ConfigContext from "../ConfigProvider/context";

export interface ApiErrorProps {
  errors: { [key: string]: any[] };
}

export interface FCApiError extends React.FC<ApiErrorProps> {
  showError: (errors: any) => void;
}

const ApiError: FCApiError = ({ errors }) => {
  const { translate } = useContext(ConfigContext);

  const msg = Object.keys(errors)
    .map(key => errors[key].map(v => translate(v)).join("<br />"))
    .join("<br />");
  return <span dangerouslySetInnerHTML={{ __html: msg }} />;
};

ApiError.showError = (errors: any) => {
  notification.error({
    message: <ApiError errors={errors} />
  });
};

export default ApiError;
