import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import LiteSearchInput from "./index";

const mockProps = {
  style: {},
  onClear: jest.fn(),
  onSearch: jest.fn(),
  onChange: jest.fn(),
  debounceDelay: 1
};

const setUp = (props?) => mount(<LiteSearchInput {...props} />);

describe("LiteSearchInput component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("LiteSearchInput rendered correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("LiteSearchInput handleChange works correctly", () => {
    const searchBtn = component.find(".lite-search__input");
    const mockedEvent = {
      target: {
        value: "value"
      }
    };
    searchBtn.simulate("change", mockedEvent);
    expect(component.props().onChange).toBeCalledTimes(1);
  });

  it("LiteSearchInput handleClear works correctly", () => {
    const searchBtn = component.find(".lite-search__input");
    const mockedEvent = {
      target: {
        value: "value"
      }
    };
    component.setProps({ onChange: jest.fn() });
    searchBtn.simulate("change", mockedEvent);
    const clearBtn = component.find(".lite-search__cancel-icon");

    clearBtn.first().simulate("click");
    expect(component.props().onClear).toBeCalledTimes(1);
  });

  it("LiteSearchInput update with empty value", () => {
    component.setProps({ value: "" });
    const searchBtn = component.find(".lite-search__input");

    expect(searchBtn.prop("value")).toBe("");
  });
});
