import "jsdom-global/register";
import React from "react";
import { shallow } from "enzyme";

import DrawerForm from "./index";

const mockProps = {
  title: "title",
  visible: true,
  formStore: {
    watch: jest.fn()
  },
  onClose: jest.fn()
};

const setUp = (props?) => shallow(<DrawerForm {...props} />);

describe("DrawerForm component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("Render DrawerForm correctly", () => {
    expect(component).toMatchSnapshot();
  });
});
