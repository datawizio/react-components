import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import Modal from "./index";

const mockProps = {};

const setUp = (props?) => mount(<Modal {...props} />);

describe("Modal component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("Modal rendered correctly", () => {
    expect(component).toMatchSnapshot();
  });
});
