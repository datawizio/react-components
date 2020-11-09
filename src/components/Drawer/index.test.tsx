import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import Drawer from "./index";

const mockProps = {
  actions: "actions",
  footer: <span />
};

const setUp = (props?) => mount(<Drawer {...props} />);

describe("Drawer component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("Drawer rendered correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("Drawer without footer block", () => {
    const wrapper = setUp({ ...mockProps, footer: null });
    expect(wrapper).toMatchSnapshot();
  });

  it("Drawer without footer & actions block", () => {
    const wrapper = setUp({ actions: null, footer: null });
    expect(wrapper).toMatchSnapshot();
  });
});
