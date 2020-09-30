import React from "react";
import { shallow } from "enzyme";
import DrawerSelect from "./index";

jest.mock("./antd/RcSelect", () => "rcSelect");
jest.mock("./antd/AntSelect", () => "antSelect");

const loadData = jest.fn((filters, page) =>
  Promise.resolve({
    data: {
      value: "dataValue"
    },
    totalPages: 10
  })
);

const onChange = jest.fn();

const mockDrowerProps = {
  placeholder: "Select",
  showSearch: true,
  allowClear: true,
  value: "mockValue",
  options: [
    { title: "1", key: "1", label: "label 1" },
    { title: "12", key: "2", label: "label 2" },
    { title: "123", key: "3", label: "label 3" },
    { title: "1234", key: "4", label: "label 4" }
  ],
  multiple: true,
  loadData,
  onChange
};

const setUp = (props?) => shallow(<DrawerSelect {...props} />);

describe("DrawerSelect component", () => {
  it("Rendered corectly", () => {
    const wrapper = setUp();
    expect(wrapper).toMatchSnapshot();
  });
  it("Component has ant class", () => {
    const wrapper = setUp();
    expect(wrapper.find(".drawer-select").length).toBe(1);
  });
  it("Select placeholder render correctly", () => {
    const wrapper = setUp(mockDrowerProps);
    expect(wrapper.prop("placeholder")).toEqual(mockDrowerProps.placeholder);
  });

  it("Options have correct type", () => {
    const wrapper = setUp(mockDrowerProps);
    const options = wrapper.prop("options");
    expect(Array.isArray(options)).toBeTruthy();
  });
  it("Component onChange func was called", () => {
    const wrapper = setUp(mockDrowerProps);
    wrapper.simulate("change");
    expect(onChange).toBeCalledTimes(1);
  });

  it("onFocus function works", () => {
    const wrapper = setUp(mockDrowerProps);
    const mockContains = jest.fn();
    wrapper.simulate("focus", {
      target: {
        classList: {
          contains: mockContains
        }
      }
    });
    expect(mockContains).toBeCalledTimes(1);
  });

  it("DropdownRender render correctly", () => {
    const wrapper = setUp(mockDrowerProps);
    const DropdownRender = wrapper.prop("dropdownRender");
    const dropdownWrapper = shallow(<DropdownRender />);
    dropdownWrapper.simulate("close");

    expect(dropdownWrapper.prop("drawerVisible")).toBeFalsy();
  });
});
