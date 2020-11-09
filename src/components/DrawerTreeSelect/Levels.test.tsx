import "jsdom-global/register";
import React from "react";
import { Levels } from "./Levels";
import { mount } from "enzyme";

jest.mock("../Select/index.less", () => {});

const onChange = jest.fn(() => {});
const mockProps = {
  value: "value",
  levels: [
    {
      value: "levels value",
      label: "label"
    }
  ],
  onChange
};

const setUp = (props = mockProps) => mount(<Levels {...props} />);

describe("Levels", () => {
  it("Levels to match snapshot", () => {
    const wrapper = setUp();
    expect(wrapper).toMatchSnapshot();
  });

  it("Inner level render correctly", () => {
    const wrapper = setUp();
    const select = wrapper.find(".drawer-tree-select-levels").first();

    expect(select).toMatchSnapshot();
  });

  it("Get coorrect props", () => {
    const wrapper = setUp();
    const { levels, value } = wrapper.props();

    expect(levels).toEqual(mockProps.levels);
    expect(value).toEqual(mockProps.value);
  });
});
