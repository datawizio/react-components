import "jsdom-global/register";
import React from "react";
import { shallow } from "enzyme";

import List from "./index";

const mockProps = {
  bordered: false
};

const setUp = (props?) => shallow(<List {...props} />);

describe("List component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("List render  with correct props", () => {
    expect(component.prop("bordered")).toBeFalsy();
  });
});
