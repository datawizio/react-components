import "jsdom-global/register";
import React from "react";
import { shallow } from "enzyme";

import UserButton from "./index";

const mockProps = {
  photo: "photopath",
  fullName: "FullUserName",
  menu: <></>,
  showFullName: true
};

const setUp = (props?) => shallow(<UserButton {...props} />);

describe("UserButton component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("UserButton rendered correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("UserButton show full name", () => {
    expect(component.html()).toContain(mockProps.fullName);
  });

  it("UserButton hide full name", () => {
    const wrapper = setUp({ ...mockProps, showFullName: false });
    expect(wrapper.html()).not.toContain(mockProps.fullName);
  });

  it("UserButton without photo", () => {
    const wrapper = setUp({ ...mockProps, photo: null });
    expect(wrapper.find("img").length).toBeFalsy();
  });
});
