import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import DrawerForm from "./index";

const mockProps = {
  title: "title",
  visible: true
};

const setUp = (props?) => mount(<DrawerForm {...props} />);

describe("DrawerForm component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("Render DrawerForm correctly", () => {
    expect(component).toMatchSnapshot();
  });
});
