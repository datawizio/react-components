import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";
import DateRangePicker from "./index";

jest.mock("./presets", () => ({
  DefaultPreset: {
    yesterday: "2020-10-22T13:06:36.873Z",
    lastWeek: "2020-10-22T13:06:36.873Z",
    currentMonth: "2020-10-22T13:06:36.873Z",
    last_30_days: "2020-10-22T13:06:36.873Z",
    last_90_days: "2020-10-22T13:06:36.873Z",
    currentYear: "2020-10-22T13:06:36.873Z"
  }
}));

const mockProps = {
  defaultPresetUsed: true,
  fullWidth: true,
  maxDate: "2020-10-22T13:06:36.873Z",
  onChange: jest.fn()
};

const setUp = (props?) => mount(<DateRangePicker {...props} />);

describe(" DateRangePicker component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  Object.defineProperty(window, "cancelAnimationFrame", () => {});

  it("DateRangePicker rendered correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("DateRangePicker rendered correctly with empty props", () => {
    const wrapper = setUp();
    expect(wrapper).toMatchSnapshot();
  });

  it("DateRangePicker trigger onChange with empty", () => {
    const rangePicker = component.find("RangePicker").first();
    rangePicker.props().onChange("");
    expect(component).toMatchSnapshot();
  });

  it("DateRangePicker trigger onChange with mock", () => {
    const dateRange = ["2020-10-22T13:06:36.873Z", "2020-11-22T13:06:36.873Z"];
    const rangePicker = component.find("RangePicker").first();
    rangePicker.props().onChange(dateRange);
    expect(component).toMatchSnapshot();
  });
});
