import { Result } from "antd";
import React from "react";
import { openChat } from "../../utils/chat";

import Button from "../Button";
import ConfigContext from "../ConfigProvider/context";
import { OopsIcon } from "../Icons/OopsIcon";
import { RefreshIcon } from "../Icons/RefreshIcon";

import "./index.less";

type ErrorBoundaryState = {
  hasError: boolean;
  eventId: string;
  error: any;
  errorInfo: any;
  chunkError: boolean;
};

export default class ErrorBoundary extends React.Component<
  {
    onError: (error: any, errorInfo: any) => Promise<string>;
    onReportFeedbackClick?: (eventId: string) => void;
  },
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      eventId: "",
      error: "",
      errorInfo: "",
      chunkError: false
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  async componentDidCatch(error: any, errorInfo: any) {
    if (
      error.toString().includes("ChunkLoadError") ||
      error.toString().includes("Loading CSS chunk") ||
      error.toString().includes("Failed to fetch")
    ) {
      this.setState({ chunkError: true });
      return;
    }
    const eventId = await this.props.onError(error, errorInfo);
    this.setState({ eventId, error, errorInfo });
  }

  handlerButtonClick = () => {
    openChat(
      this.state.error.stack,
      this.state.errorInfo.componentStack,
      this.state.error.eventId
    );
    this.props.onReportFeedbackClick &&
      this.props.onReportFeedbackClick(this.state.eventId);
  };

  handlerRefreshClick = () => {
    window.location.reload();
  };

  render() {
    if (this.state.chunkError) {
      return (
        <Result
          icon={<RefreshIcon />}
          title={this.context.translate("NEED_REFRESH")}
          extra={
            <Button type="primary" onClick={this.handlerRefreshClick}>
              {this.context.translate("REFRESH")}
            </Button>
          }
        />
      );
    }
    if (this.state.hasError) {
      return (
        <Result
          icon={<OopsIcon />}
          title={this.context.translate("SOMETHING_WENT_WRONG")}
          extra={
            <Button type="primary" onClick={this.handlerButtonClick}>
              {this.context.translate("REPORT_FEEDBACK")}
            </Button>
          }
        />
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.contextType = ConfigContext;
