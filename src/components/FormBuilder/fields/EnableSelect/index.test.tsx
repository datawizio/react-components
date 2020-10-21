import "jsdom-global/register";
import React from "react";
import { shallow } from "enzyme";

import { FieldEnableSelect } from "./index";

const mockProps = {
  label: "label",
  name: "name",
  initialValue: "init",
  placeholder: "placeholder",
  renderField: jest.fn(),
  onChange: jest.fn()
};

const setUp = (props?) => shallow(<FieldEnableSelect {...props} />);

describe("FieldEnableSelect component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("FieldEnableSelect rendered correctly", () => {
    expect(component).toMatchSnapshot();
  });
});
