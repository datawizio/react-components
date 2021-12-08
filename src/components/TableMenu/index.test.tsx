import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";
import "react-dom/test-utils";
import TableXlsxExporter from "./index";
import Table from "../Table";

import TableMenu from "./index";

const dropdownClick = (wrapper, name) => {
  return wrapper
    .findWhere(n => n.text() === name)
    .first()
    .find(".ant-checkbox-input")
    .simulate("click");
};

const mockTableProps = {
  height: "auto",
  width: "auto",
  dTypesConfig: {},
  async: false,
  columns: [
    {
      title: "Name",
      key: "name",
      dataIndex: "name"
    }
  ],
  dataSource: [
    {
      key: "1",
      name: "John"
    }
  ]
};

const mockPropsTableMenu = {
  config: {
    fixed_total: true,
    expand_table_vertically: true,
    expand_table_horizontally: true,
    show_send_to_email: true
  }
};

const setUpWithoutTable = (props?) => mount(<TableXlsxExporter {...props} />);
const setUp = (props?) =>
  mount(
    //@ts-ignore
    <Table {...mockTableProps}>
      <Table.ToolBar>
        <TableMenu config={props} />
      </Table.ToolBar>
    </Table>
  );

describe("TableXlsxExporter component", () => {
  let component;

  beforeAll(() => {
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
  });

  beforeEach(() => {
    component = setUp();
  });
  it("should TableMenu render correctly", () => {
    expect(component.render()).toMatchSnapshot();
  });
  it("should full TableMenu render correctly", () => {
    const wrapper = setUpWithoutTable(mockPropsTableMenu);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it("should clicks works correctly", async () => {
    const wrapper = setUpWithoutTable({
      onTotalClick: jest.fn(),
      onExpandVertical: jest.fn(),
      onExpandHorizontal: jest.fn(),
      onSendClick: jest.fn(),
      exportHandler: jest.fn(),
      ...mockPropsTableMenu
    });
    wrapper.find(".table-menu__button").at(0).simulate("click");

    dropdownClick(wrapper, "FIXED_TOTAL");
    expect(wrapper.prop("onTotalClick")).toBeCalled();

    dropdownClick(wrapper, "EXPAND_THE_TABLE_VERTICALLY");
    expect(wrapper.prop("onExpandVertical")).toBeCalled();

    dropdownClick(wrapper, "EXPAND_TABLE_HORIZONTALLY");
    expect(wrapper.prop("onExpandHorizontal")).toBeCalled();

    wrapper
      .findWhere(n => n.text() === "SEND_XLS")
      .first()
      .simulate("click");
    expect(wrapper.prop("onSendClick")).toBeCalled();
    wrapper
      .findWhere(n => n.text() === "SAVE_XLS")
      .first()
      .simulate("click");
    expect(wrapper.prop("exportHandler")).toBeCalled();
    expect(
      document.querySelectorAll(".ant-message-notice")[0].textContent
    ).toBe("LOADING");
  });
});
