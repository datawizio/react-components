import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";
import Button from "./index";

const mockButtonProps = {
  border: false,
  className: "customClassName"
};

const setUp = (props?) => mount(<Button {...props} />);

describe("Button component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockButtonProps);
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
    const wrapper = setUp({ ...mockButtonProps, border: true });
    expect(wrapper.find(".no-border").length).toBeFalsy();
  });

  it("Button get correct className", () => {
    expect(component.find(`.${mockButtonProps.className}`).length).toBeTruthy();
  });
});
