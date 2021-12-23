import "jsdom-global/register";
import React from "react";
import { shallow } from "enzyme";

import { IntervalItem } from "./IntervalItem";

const mockProps = {
  label: "label",
  value: "value",
  onChange: jest.fn()
};

const setUp = (props?) => shallow(<IntervalItem {...props} />);

xdescribe("FormBuilder IntervalItem component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("IntervalItem rendered correctly", () => {
    expect(component).toMatchSnapshot();
  });
});
