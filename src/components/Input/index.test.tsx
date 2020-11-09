import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import Input from "./index";

const mockProps = {};

const setUp = (props?) => mount(<Input {...props} />);

describe("Input component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("Input rendered correctly", () => {
    expect(component).toMatchSnapshot();
  });
});
