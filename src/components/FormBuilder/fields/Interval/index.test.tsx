import "jsdom-global/register";
import React from "react";
import dayjs from "dayjs";
import { shallow } from "enzyme";

import { FieldInterval } from "./index";

const mockProps = {
  name: "name",
  label: "label",
  rules: [
    {
      from: dayjs("01-04-2020"),
      to: dayjs("01-04-2020")
    }
  ],
  format: "{YYYY} MM-DDTHH:mm:ss SSS [Z] A",
  minDate: dayjs("03-04-2020"),
  maxDate: dayjs("03-06-2020"),
  onChange: jest.fn()
};

const setUp = (props?) => shallow(<FieldInterval {...props} />);

describe("FormBuilder FieldInterval component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("FormBuilder FieldInterval rendered correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("FormBuilder FieldInterval rendered correctly  without rules", () => {
    const wrapper = setUp({ ...mockProps, rules: null });
    expect(wrapper).toMatchSnapshot();
  });

  it("FormBuilder FieldInterval  with empty value", () => {
    const interval = component.find("Interval").first();
    interval.prop("onChange")("value");
    expect(component).toMatchSnapshot();
  });
});
