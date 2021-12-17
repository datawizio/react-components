import "jsdom-global/register";
import React from "react";
import { mount, shallow } from "enzyme";
import Table from "../Table";

import TableMenu from "./index";
import { render, fireEvent } from "@testing-library/react";

const dropdownClick = (wrapper, name) => {
  fireEvent.click(wrapper.getByText(name));
  return wrapper
    .getByText(name)
    .parentElement.querySelector(".ant-checkbox-input").checked;
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

const setUpWithoutTable = (props?) => mount(<TableMenu {...props} />);
const setUp = (props?) =>
  shallow(
    //@ts-ignore
    <Table {...mockTableProps}>
      <Table.ToolBar>
        <TableMenu config={props} />
      </Table.ToolBar>
    </Table>
  );

describe("TableMenu component", () => {
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
    component = setUp().render();
  });
  it("should TableMenu render correctly", () => {
    expect(component).toMatchSnapshot();
  });
  it("should full TableMenu render correctly", () => {
    const wrapper = setUpWithoutTable(mockPropsTableMenu);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it.skip("should checkbox works correctly", async () => {
    const component = render(
      //@ts-ignore
      <Table {...mockTableProps}>
        <Table.ToolBar>
          <TableMenu
            {...{
              onTotalClick: jest.fn(),
              onExpandVertical: jest.fn(),
              onExpandHorizontal: jest.fn(),
              onSendClick: jest.fn(),
              exportHandler: jest.fn(),
              ...mockPropsTableMenu
            }}
          />
        </Table.ToolBar>
      </Table>
    );
    fireEvent.click(document.querySelector(".table-menu__button"));
    expect(dropdownClick(component, "FIXED_TOTAL")).toBeTruthy();
    expect(
      dropdownClick(component, "EXPAND_THE_TABLE_VERTICALLY")
    ).toBeTruthy();
    expect(dropdownClick(component, "EXPAND_TABLE_HORIZONTALLY")).toBeTruthy();
  });
  it.skip("should export button work correctly", () => {
    const wrapper = setUpWithoutTable({
      onTotalClick: jest.fn(),
      onExpandVertical: jest.fn(),
      onExpandHorizontal: jest.fn(),
      onSendClick: jest.fn(),
      exportHandler: jest.fn(),
      ...mockPropsTableMenu
    });
    wrapper.find(".table-menu__button").at(0).simulate("click");
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
