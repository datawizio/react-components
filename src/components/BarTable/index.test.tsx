import "jsdom-global/register";
import React from "react";
import { shallow } from "enzyme";
import BarTable from "./index";
import mock_data from "./mock_data";

/******************************************************************************/

jest.mock("rc-tree-select/es/utils/valueUtil", () => ({
  flattenOptions: val => val,
  filterOptions: val => val
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

const mockProps = {
  columns: mock_data.columns,
  dataSource: mock_data.dataSource,
  titleKey: "MANAGERS_ACTIVITY",
  height: 244,
  tooltip: jest.fn().mockImplementation((cellVal, row, column) => {
    return (
      <div>
        <p>Lorem Ipsum</p>
        <p>OPEN</p>
        <p>7</p>
      </div>
    );
  })
};

const setUp = (props?) => shallow(<BarTable {...props} />);

/******************************************************************************/

describe("BarTable component", () => {
  let component;

  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("BarTable title exists", () => {
    expect(component.find(".bar-table-title").length).toBeTruthy();
  });

  it("BarTable exists", () => {
    expect(component.render().find(".BarTable table").length).toBeTruthy();
  });
});
