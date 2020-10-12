import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";
import Breadcrumb from "./index";

const mockButtonProps = {
  className: "customClassName"
};

const setUp = (props?) => mount(<Breadcrumb {...props} />);

describe("Breadcrumb component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockButtonProps);
  });

  it("Breadcrumb rendered correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("Breadcrumb with  correct separator", () => {
    const wrapper = setUp({ ...mockButtonProps, separator: ">" });
    expect(wrapper.props().separator).toBe(">");
  });

  it("Breadcrumb get correct className", () => {
    expect(component.find(`.${mockButtonProps.className}`).length).toBeTruthy();
  });
});
