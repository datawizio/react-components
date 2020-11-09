import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import InfiniteScroll from "./index";

const mockProps = {
  height: 550,
  maxPage: 3,
  onBottom: jest.fn(),
  triggerCoeff: true,
  showLoader: true
};

const setUp = (props?) => mount(<InfiniteScroll {...props} />);

describe("InfiniteScroll component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("Render InfiniteScroll correctly", () => {
    expect(component).toMatchSnapshot();
  });
});
