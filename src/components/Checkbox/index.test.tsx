import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";
import Checkbox from "./index";

const mockButtonProps = {
  className: "customClassName"
};

const setUp = (props?) => mount(<Checkbox {...props} />);

describe("Checkbox component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockButtonProps);
  });

  it("Checkbox rendered correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("Checkbox get correct className", () => {
    expect(component.find(`.${mockButtonProps.className}`).length).toBeTruthy();
  });
});
