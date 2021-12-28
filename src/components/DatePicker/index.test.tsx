import "jsdom-global/register";
import React from "react";
import { shallow } from "enzyme";

import DatePicker from "./index";

const mockProps = {};

const setUp = (props?) => shallow(<DatePicker {...props} />);

describe(" DatePicker component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("DatePicker rendered correctly", () => {
    expect(component).toMatchSnapshot();
  });
});
