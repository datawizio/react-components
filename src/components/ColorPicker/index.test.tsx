import "jsdom-global/register";
import React from "react";
import { mount, shallow } from "enzyme";

import ColorPicker from "./index";

window.HTMLCanvasElement.prototype.getContext = jest.fn();

const mockProps = {
  value: "#A771FE",
  onChange: jest.fn(),
  defaultColors: ["#782FEF", "#231F20", "#E8D5D5", "#DF8600", "#FBE7B5"],
  render: jest.fn()
};

const setUp = (props?) => shallow(<ColorPicker {...props} />);

describe("ColorPicker component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("ColorPicker with props rendered correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("ColorPicker without props rendered correctly", () => {
    const wrapper = setUp();

    expect(wrapper).toMatchSnapshot();
  });

  it("ColorPicker popover open render corectly", async () => {
    const wrapper = shallow(<ColorPicker />);
    wrapper.simulate("click");
    expect(wrapper).toMatchSnapshot();
  });

  it.skip("ColorPicker onChange", () => {
    const mockedEvent = { target: { value: { hex: "#4d1d1d" } } };

    const wrapper = mount(<ColorPicker {...mockProps} />);
    wrapper.simulate("click");
    const popoverContent = wrapper.find(".ant-popover-inner-content");
    //@ts-ignore
    popoverContent.props().children.props.onChange(mockedEvent);
    expect(wrapper.prop("onChange")).toBeCalledTimes(1);
  });
});
