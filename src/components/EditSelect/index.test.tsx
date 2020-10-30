import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import EditSelect from "./index";

const mockProps = {
  placeholder: "placeholder",
  inputPlaceholder: "inputPlaceholder",
  options: [{ key: "key", title: "title" }],
  onSave: jest.fn()
};

const setUp = (props?) => mount(<EditSelect {...props} />);

describe("EditSelect component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("Render EditSelect correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("Render Tree (show check all) correctly", () => {
    //TODO
    // const input = component.find("Input").first();
    // input.simulate("keypress", { key: "Enter" }),
    //   expect(component.props()).toBeCalled();
  });
});
