import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import Header from "./Header";

const mockProps = {
  title: "title"
};

const setUp = (props?) => mount(<Header {...props} />);

describe("ListHeader component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("ListHeader render  with correct title", () => {
    const item = component.find(".list-item-header");
    expect(item.first().html()).toContain(mockProps.title);
  });
});
