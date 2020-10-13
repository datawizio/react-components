import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import Button from "./index";

const mockProps = {
  border: false,
  className: "customClassName"
};

const setUp = (props?) => mount(<Button {...props} />);

describe("Button component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("Render button correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("Button has correct class", () => {
    expect(component.find(".dw-btn").length).toBeTruthy();
  });

  it("Button without border has correct class", () => {
    expect(component.find(".no-border").length).toBeTruthy();
  });

  it("Button bordered has correct class", () => {
    const wrapper = setUp({ ...mockProps, border: true });
    expect(wrapper.find(".no-border").length).toBeFalsy();
  });

  it("Button get correct className", () => {
    expect(component.find(`.${mockProps.className}`).length).toBeTruthy();
  });
});
