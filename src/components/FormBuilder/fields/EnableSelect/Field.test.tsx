import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import { Field } from "./Field";

const value = {
  enabled: true,
  value: "value"
};
const mockProps = {
  name: "Field name",
  placeholder: "Field placeholder",
  value,
  onChange: jest.fn(),
  renderField: ({ value }) => <span>{value}</span>
};

const setUp = (props?) => mount(<Field {...props} />);

describe("EnableSelect Field component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("Field rendered correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("Field call onChange", () => {
    const mockEvent = {
      target: {
        checked: true
      }
    };
    const checkbox = component.find("Checkbox").first();
    checkbox.props().onChange(mockEvent);
    expect(component.prop("onChange")).toBeCalled();
  });
});
