import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import TreeSelect from "./index";

const mockProps = {};

const setUp = (props?) => mount(<TreeSelect {...props} />);

describe("TreeSelect component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("Render TreeSelect correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("Render TreeSelect with check all", () => {
    expect(setUp({ showCheckAll: true })).toMatchSnapshot();
  });
});
