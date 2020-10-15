import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import AppFooter from "./index";

const mockProps = {};

const setUp = (props?) => mount(<AppFooter {...props} />);

describe("AppFooter component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("Render AppFooter correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("AppFooter has correct class", () => {
    expect(component.find(".main-footer").length).toBeTruthy();
  });

  it("AppFooter has correct translate key", () => {
    expect(component.html()).toContain("COPYRIGHT");
  });
});
