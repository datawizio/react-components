import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import Skeleton from "./index";

const mockProps = {};

const setUp = (props?) => mount(<Skeleton {...props} />);

describe("Skeleton component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("Render Skeleton correctly", () => {
    expect(component).toMatchSnapshot();
  });
});
