import React from "react";

import Button from "../Button";

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
          <h1>Something gone bad</h1>
          <Button onClick={this.handlerButtonClick}>Report feedback</Button>
        </>
      );
    }

    return this.props.children;
  }
}
