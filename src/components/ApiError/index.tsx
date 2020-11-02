import React from "react";

import { notification } from "antd";

export interface ApiErrorProps {
  errors: string;
}

export interface FCApiError extends React.FC<ApiErrorProps> {
  showError: (errors: any) => void;
}

const ApiError: FCApiError = ({ errors }) => {
  const a = 1;

  return <span dangerouslySetInnerHTML={{ __html: errors }} />;
};

ApiError.showError = (errors: any) => {
  notification.error({
    message: <ApiError errors={errors} />
  });
};

export default ApiError;
