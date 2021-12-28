import "jsdom-global/register";
import React from "react";
import dayjs from "dayjs";
import { mount } from "enzyme";

import { Interval } from "./Interval";

const moockValue = {
  from: dayjs("03-04-2020"),
  to: dayjs("03-06-2020")
};

const mockProps = {
  label: "label",
  value: "value",
  onChange: jest.fn()
};

const setUp = (props?) => mount(<Interval {...props} />);

describe("FormBuilder Interval component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("FormBuilder Interval rendered correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("FormBuilder Interval  with empty value", () => {
    const wrapper = setUp({ ...mockProps, value: moockValue });
    expect(wrapper).toMatchSnapshot();
  });

  it("FormBuilder Interval trigger handleFromChange", () => {
    const intervalItemFrom = component.findWhere(n => {
      return n.prop("label") === "FROM" && n.name() === "IntervalItem";
    });
    expect(component.prop("onChange")).not.toBeCalled();
    intervalItemFrom.props().onChange("from");
    expect(component.prop("onChange")).toBeCalled();
  });

  it("FormBuilder Interval trigger handleToChange", () => {
    const intervalItemTo = component.findWhere(n => {
      return n.prop("label") === "TO" && n.name() === "IntervalItem";
    });
    expect(component.prop("onChange")).not.toBeCalled();
    intervalItemTo.props().onChange("to");
    expect(component.prop("onChange")).toBeCalled();
  });
});
