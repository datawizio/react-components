import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import EditSelect from "./index";

const mockProps = {
  placeholder: "placeholder",
  inputPlaceholder: "inputPlaceholder",
  options: [{ key: "key", title: "title" }],
  onSave: jest.fn(),
  onDelete: jest.fn(),
  onChange: jest.fn()
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

  it("Simulate Input change", () => {
    const mockEvent = {
      target: {
        value: "inputValue"
      }
    };
    const saveButton = component.find("Input").first();
    saveButton.simulate("change", mockEvent);
    expect(component).toMatchSnapshot();
  });
});
