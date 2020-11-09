import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import HighChart from "./index";

const mockProps = {
  config: {
    chart: {
      height: 20
    }
  },
  loading: true,
  responsible: true
};

const setUp = (props?) => mount(<HighChart {...props} />);

describe("HighChart component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("Render HighChart correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("Render HighChart correctly with empty props", () => {
    expect(setUp({})).toMatchSnapshot();
  });

  it("Unmout HighChart ", () => {
    expect(component.unmount()).toEqual({});
  });
});
