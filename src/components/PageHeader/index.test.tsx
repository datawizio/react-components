import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import PageHeader from "./index";

const mockProps = {
  title: "Header title"
};

const setUp = (props?) => mount(<PageHeader {...props} />);

describe("PageHeader component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("PageHeader rendered correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("PageHeader with  correct className", () => {
    expect(component.find(".page-header").length).toBeTruthy();
    expect(component.find(".page-header-back").length).toBeFalsy();
  });

  it("PageHeader render back button", () => {
    const wrapper = setUp({ ...mockProps, onBack: jest.fn() });
    expect(wrapper.find(".page-header-back").length).toBeTruthy();
  });

  it("PageHeader render correct inner html", () => {
    expect(component.find(".page-header-title").html()).toContain(
      mockProps.title
    );
  });
});
