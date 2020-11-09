import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import ListItemField from "./Field";

const mockProps = {
  title: "title",
  description: "description",
  value: "value",
  onClick: jest.fn()
};

const setUp = (props?) => mount(<ListItemField {...props} />);

describe("ListItemField component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("ListItemField rendered correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("ListItemField correctly call click action", () => {
    const item = component.find(".list-item-field");
    item.first().simulate("click");
    expect(component.props().onClick).toBeCalledTimes(1);
  });

  it("ListItemField render  with correct value", () => {
    const item = component.find(".value-container");
    expect(item.html()).toContain(mockProps.value);
  });
});
