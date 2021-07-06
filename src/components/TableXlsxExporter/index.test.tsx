import "jsdom-global/register";
import React from "react";
import { mount, shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import { waitFor } from "@testing-library/react";
import TableXlsxExporter from "./index";
import Table from "../Table";
import {
  getStaticColumn,
  getStaticDataSource,
  getStatickModel,
  sortable
} from "../Table/__mocks__";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { exportTableToXLSX } from "./exporters";
import { TableProps } from "../Table/types";

const mockTableProps: TableProps = {
  height: "auto",
  width: "auto",
  dTypesConfig: {},
  dataProvider: jest.fn(() => {
    return {
      columns: [],
      dataSource: []
    };
  })
};

const setUp = (props?) => mount(<TableXlsxExporter {...props} />);

describe("TableXlsxExporter component", () => {
  let component;
  let realUseContext;
  let useContextMock;
  beforeEach(() => {
    component = setUp();
    realUseContext = React.useContext;
    useContextMock = React.useContext = jest.fn();
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  it("should render corectly", () => {
    expect(component).toMatchSnapshot();
  });

  it("should export corectly", async () => {
    useContextMock.mockReturnValue({ ...mockTableProps });
    const wrapper = shallow(
      <Table {...mockTableProps}>
        <Table.ToolBar>
          <TableXlsxExporter exportHandler={exportTableToXLSX} />
        </Table.ToolBar>
      </Table>
    );
    console.log(wrapper.props().children.props);

    expect(wrapper.find("Table")).toMatchSnapshot();

    wrapper.render();

    const XlsxExporterButton = wrapper.find("TableXlsxExporter").dive();
    console.log(XlsxExporterButton.props());

    await waitFor(() => {
      XlsxExporterButton.find("Button").first().simulate("click");
    });

    // wrapper.update();

    // expect(
    //   document.querySelectorAll(".ant-message-notice")[0].textContent
    // ).toBe("LOADING");
  });
});
