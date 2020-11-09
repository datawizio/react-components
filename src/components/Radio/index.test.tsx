import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import Radio from "./index";

const mockProps = {};

const setUp = (props?) => mount(<Radio {...props} />);

describe("Radio component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("Render Radio correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("Render Radio.Group correctly", () => {
    const wrapper = mount(<Radio.Group vertical></Radio.Group>);
    expect(wrapper).toMatchSnapshot();
  });
  it("Render horisontal Radio.Group correctly", () => {
    const wrapper = mount(<Radio.Group vertical={false}></Radio.Group>);
    expect(wrapper).toMatchSnapshot();
  });
});
