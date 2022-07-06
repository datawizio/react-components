import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import ErrorBoundary from "./index";

const mockProps = {
  onError: jest.fn(),
  onReportFeedbackClick: jest.fn()
};

const CustomComponent = () => <span>inner</span>;

const setUp = (props?) =>
  mount(
    <ErrorBoundary {...props}>
      <CustomComponent />
    </ErrorBoundary>
  );

describe("ErrorBoundary component", () => {
  let component;
  beforeAll(() => {
    window.$crisp = [];
  });

  beforeEach(() => {
    jest.spyOn(console, "error");
    //@ts-ignore
    console.error.mockImplementation(() => {});
    component = setUp(mockProps);
  });
  afterEach(() => {
    //@ts-ignore
    console.error.mockRestore();
  });

  it("ErrorBoundary render chunkError", () => {
    const error = new Error("ChunkLoadError");
    component.find(CustomComponent).simulateError(error);
    expect(component.state("chunkError")).toBeTruthy();
    expect(component).toMatchSnapshot();
  });

  it("Simulate Button click", () => {
    const inner = component.find("CustomComponent").first();
    inner.simulateError("errText");
    const button = component.find("Button").first();
    button.simulate("click");
    expect(component.prop("onReportFeedbackClick")).toBeCalled();
  });
});
