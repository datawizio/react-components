import "jsdom-global/register";
import React from "react";
import { shallow } from "enzyme";

import SideButton from "./index";

const mockProps = {};

const setUp = (props?) => shallow(<SideButton {...props} />);

describe("SideButton component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("SideButton rendered correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("SideButton has correct class(right)", () => {
    expect(component.find(".side-button--right").length).toBeTruthy();
  });

  it("SideButton has correct class(left)", () => {
    const wrapper = setUp({ side: "left" });
    expect(wrapper.find(".side-button--left").length).toBeTruthy();
  });
});
