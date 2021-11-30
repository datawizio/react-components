import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import ErrorBoundary from "./index";

const mockProps = {
  onError: jest.fn(),
  onReportFeedbackClick: jest.fn()
};

const CustomComponeent = () => <span>inner</span>;

const setUp = (props?) =>
  mount(
    <ErrorBoundary {...props}>
      <CustomComponeent />
    </ErrorBoundary>
  );

xdescribe("ErrorBoundary component", () => {
  let component;
  beforeAll(() => {
    window.$crisp = [];
  });

  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("ErrorBoundary works correctly", () => {
    const inner = component.find("CustomComponeent").first();
    inner.simulateError("errText");

    expect(component.state("hasError")).toBeTruthy();
  });

  it("Simulate Button click", () => {
    const inner = component.find("CustomComponeent").first();
    inner.simulateError("errText");
    const button = component.find("Button").first();
    button.simulate("click");
    expect(component.prop("onReportFeedbackClick")).toBeCalled();
  });
});
