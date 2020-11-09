import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import BackTop from "./index";

const mockProps = {};

const setUp = (props?) => mount(<BackTop {...props} />);

describe("BackTop component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("Render BackTop correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("BackTop has correct class", () => {
    expect(component.find(".dw-back-top").length).toBeTruthy();
  });
});
