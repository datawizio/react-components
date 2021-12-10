import "jsdom-global/register";
import React from "react";
import { mount, shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import { generateData } from "./__mocks__";
import TreeSearch from "./index";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

const gData = generateData();

const mockProps = {
  treeData: gData,
  setSearchValue: jest.fn(),
  showCheckAll: true
};

const setUp = (props?) => shallow(<TreeSearch {...props} />);

describe("TreeSearch component", () => {
  let component;
  afterEach(cleanup);
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("should render correctly", async () => {
    expect(component).toMatchSnapshot();
    expect(component.find(".tree-search-input").length).toBeTruthy();
    expect(component.find("Tree").length).toBeTruthy();
  });

  it("should render correctly with empty data and without search", () => {
    const wrapper = setUp({
      ...mockProps,
      treeData: [],
      showSearchInput: false
    });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".ant-input-search").length).toBeFalsy();
    expect(wrapper.find("Empty").length).toBeTruthy();
  });

  it("should render correctly with default expand keys", () => {
    const wrapper = setUp({
      ...mockProps,
      searchValue: "label",
      defaultExpandedKeys: ["0-0-0-key", "0-0-0-0-key", "0-0-key"]
    });
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("Tree").prop("expandedKeys")).toStrictEqual([
      "0-0-0-key",
      "0-0-0-0-key",
      "0-0-key"
    ]);
  });

  it("should search changed", () => {
    const props = {
      ...mockProps,
      treeData: []
    };
    const wrapper = render(<TreeSearch {...props} />);
    const searchInput: any = wrapper.getByPlaceholderText("SEARCH");
    fireEvent.change(searchInput, {
      target: { value: "test" }
    });
    expect(searchInput.value).toBe("test");
  });

  it("should expand", () => {
    act(() => {
      component.find("Tree").first().props().onExpand(["0-0-key", "0-1-key"]);
    });
    component.update();
    expect(component.find("Tree").first().prop("expandedKeys")).toStrictEqual([
      "0-0-key",
      "0-1-key"
    ]);
  });

  it.skip("should check all items", () => {
    const props = {
      ...mockProps,
      treeData: [{ "key": "0-0-0-0-key", "title": "0-0-0-0-label" }],
      checkable: true
    };
    const wrapper = mount(<TreeSearch {...props} />);
    wrapper.find(".ant-tree-checkbox").first().simulate("click");
    expect(
      wrapper
        .find(".ant-tree-checkbox")
        .first()
        .hasClass("ant-tree-checkbox-checked")
    ).toBeTruthy();
  });
});
