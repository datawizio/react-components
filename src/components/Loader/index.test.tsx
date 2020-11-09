import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import Loader from "./index";

const mockProps = {};

const setUp = (props?) => mount(<Loader {...props} />);

describe("Loader component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("Loader rendered correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("Loader has correct claassName", () => {
    expect(component.find(".datawiz-loader").length).toBeTruthy();
  });
});
