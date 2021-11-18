import React from "react";
import { openChat } from "../../utils/chat";

import Button from "../Button";
import ConfigContext from "../ConfigProvider/context";

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
    console.log(error);
    if (error.toString().includes("ChunkLoadError")) {
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
        <>
          <h1>{this.context.translate("NEED_REFRESH")}</h1>
          <Button onClick={this.handlerRefreshClick}>
            {this.context.translate("REFRESH")}
          </Button>
        </>
      );
    }
    if (this.state.hasError) {
      return (
        <>
          <h1>{this.context.translate("SOMETHING_GONE_BAD")}</h1>
          <Button onClick={this.handlerButtonClick}>
            {this.context.translate("REPORT_FEEDBACK")}
          </Button>
        </>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.contextType = ConfigContext;
