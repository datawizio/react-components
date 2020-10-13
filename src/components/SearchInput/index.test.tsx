import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import SearchInput from "./index";

const mockProps = {
  value: "val"
};

const setUp = (props?) => mount(<SearchInput {...props} />);

describe("SearchInput component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("SearchInput BackTop correctly", () => {
    expect(component).toMatchSnapshot();
  });
});
