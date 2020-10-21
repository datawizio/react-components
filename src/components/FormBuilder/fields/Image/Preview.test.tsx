import "jsdom-global/register";
import React from "react";
import { shallow } from "enzyme";

import { Preview } from "./Preview";

const mockProps = {
  name: "Preview name",
  placeholder: "placeholder",
  value: "value",
  onChange: jest.fn()
};

const setUp = (props?) => shallow(<Preview {...props} />);

describe("FormBuilder Preview component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("Preview rendered correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("Preview call  modal", () => {
    const mockEvent = {
      stopPropagation: jest.fn()
    };
    const modalBtn = component.find(".ant-upload-list-item").first();
    modalBtn.simulate("click", mockEvent);
    expect(component).toMatchSnapshot();
  });
});
