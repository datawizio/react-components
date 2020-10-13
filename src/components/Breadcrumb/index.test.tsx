import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import Breadcrumb from "./index";

const mockProps = {
  className: "customClassName"
};

const setUp = (props?) => mount(<Breadcrumb {...props} />);

describe("Breadcrumb component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("Breadcrumb rendered correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("Breadcrumb with  correct separator", () => {
    const wrapper = setUp({ ...mockProps, separator: ">" });
    expect(wrapper.props().separator).toBe(">");
  });

  it("Breadcrumb get correct className", () => {
    expect(component.find(`.${mockProps.className}`).length).toBeTruthy();
  });
});
