import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import CheckboxGroup from "./index";

const mockProps = {
  className: "customClassName"
};

const setUp = (props?) => mount(<CheckboxGroup {...props} />);

describe("CheckboxGroup component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("CheckboxGroup rendered correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("CheckboxGroup get correct className", () => {
    expect(component.find(`.${mockProps.className}`).length).toBeTruthy();
  });
});
