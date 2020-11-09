import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import TextArea from "./index";

const mockProps = {};

const setUp = (props?) => mount(<TextArea {...props} />);

describe("TextArea component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("Render TextArea correctly", () => {
    expect(component).toMatchSnapshot();
  });
});
