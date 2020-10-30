import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import Tree from "./index";

const mockProps = {};

const setUp = (props?) => mount(<Tree {...props} />);

describe("Tree component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("Render Tree correctly", () => {
    //TODO
    // expect(component).toMatchSnapshot();
  });

  it("Render Tree (show check all) correctly", () => {
    // expect(setUp({ showCheckAll: true })).toMatchSnapshot();
  });
});
