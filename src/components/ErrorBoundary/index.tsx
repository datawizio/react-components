import React from "react";

import Button from "../Button";
import ConfigContext from "../ConfigProvider/context";

type ErrorBoundaryState = {
  hasError: boolean;
  eventId: string;
};

export default class ErrorBoundary extends React.Component<
  {
    onError: (error: any, errorInfo: any) => Promise<string>;
    onReportFeedbackClick: (eventId: string) => void;
  },
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, eventId: "" };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  async componentDidCatch(error: any, errorInfo: any) {
    const eventId = await this.props.onError(error, errorInfo);

    this.setState({ eventId });
  }

  handlerButtonClick = () => {
    this.props.onReportFeedbackClick(this.state.eventId);
  };

  render() {
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
