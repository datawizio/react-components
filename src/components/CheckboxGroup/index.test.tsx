import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";
import CheckboxGroup from "./index";

const mockButtonProps = {
  className: "customClassName"
};

const setUp = (props?) => mount(<CheckboxGroup {...props} />);

describe("CheckboxGroup component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockButtonProps);
  });

  it("CheckboxGroup rendered correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("CheckboxGroup get correct className", () => {
    expect(component.find(`.${mockButtonProps.className}`).length).toBeTruthy();
  });
});
