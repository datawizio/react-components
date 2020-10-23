import "jsdom-global/register";
import React from "react";
import { shallow } from "enzyme";

import { FieldImage } from "./index";

const mockProps = {
  name: "Preview name",
  placeholder: "placeholder",
  label: "label",
  onChange: jest.fn()
};

const setUp = (props?) => shallow(<FieldImage {...props} />);

describe("FormBuilder FieldImage component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("Field Image rendered correctly", () => {
    expect(component).toMatchSnapshot();
  });
});
