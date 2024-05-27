import React from "react";
import { notification } from "antd";

export interface ApiErrorProps {
  errors: string;
}

export interface FCApiError extends React.FC<ApiErrorProps> {
  showError: (errors: any) => void;
  showNotification: (
    message: string,
    description?: string | null,
    type?: "error" | "warning",
    duration?: number
  ) => void;
}

const ApiError: FCApiError = ({ errors }) => {
  return <span dangerouslySetInnerHTML={{ __html: errors }} />;
};

ApiError.showError = (errors: any) => {
  notification.error({
    message: <ApiError errors={errors} />
  });
};

ApiError.showNotification = (
  message: string,
  description?: string | null,
  type?: "error" | "warning",
  duration: number = 6
) => {
  const notificationFn =
    type === "error" ? notification.error : notification.warning;
  notificationFn({
    message,
    description: description ? (
      <div dangerouslySetInnerHTML={{ __html: description }}></div>
    ) : null,
    duration: duration,
    style: {
      width: "440px",
      maxHeight: "600px",
      overflowY: "auto"
    }
  });
};

export default ApiError;
