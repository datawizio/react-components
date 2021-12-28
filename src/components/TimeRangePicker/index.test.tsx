import "jsdom-global/register";
import React from "react";
import { shallow } from "enzyme";

import TimeRangePicker from "./index";
import { fireEvent, render } from "@testing-library/react";

const mockProps = {
  fullWidth: true,
  value: { from: "2020-10-22T13:06:36.873Z", to: "2020-10-22T17:06:36.873Z" },
  onChange: jest.fn()
};

const setUp = (props?) => shallow(<TimeRangePicker {...props} />);

describe("TimeRangePicker component", () => {
  let component;
  beforeEach(() => {
    component = render(<TimeRangePicker {...mockProps} />);
  });

  it("TimeRangePicker rendered correctly", () => {
    expect(document.querySelector(".ant-picker-w100")).toBeTruthy();
  });

  it("TimeRangePicker rendered correctly with empty props", () => {
    const wrapper = setUp();
    expect(wrapper.prop("value")).toBeUndefined();
  });

  it("TimeRangePicker trigger onChange with empty", () => {
    fireEvent.change(component.getByPlaceholderText("START_TIME"), {
      target: { value: "" }
    });
    fireEvent.change(component.getByPlaceholderText("END_TIME"), {
      target: { value: "" }
    });
    expect(component.getByPlaceholderText("START_TIME").value).toBe("");
    expect(component.getByPlaceholderText("END_TIME").value).toBe("");
  });

  it("TimeRangePicker trigger onChange with mock", () => {
    const timeRange = ["2021-06-14T02:04:03.000Z", "2021-06-14T06:06:05.000Z"];

    fireEvent.change(component.getByPlaceholderText("START_TIME"), {
      target: { value: timeRange[0] }
    });
    fireEvent.change(component.getByPlaceholderText("END_TIME"), {
      target: { value: timeRange[1] }
    });

    expect(component.getByPlaceholderText("START_TIME").value).toBe(
      timeRange[0]
    );
    expect(component.getByPlaceholderText("END_TIME").value).toBe(timeRange[1]);
  });
});
