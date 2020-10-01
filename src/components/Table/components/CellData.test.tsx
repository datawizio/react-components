import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";

import CellData from "./CellData";
import { getStaticRow, getDTypeConfig, getStaticColumn } from "../__mocks__";
import { TableContext } from "../context";

const context = {
  tableState: { dTypesConfig: getDTypeConfig() },
  tableProps: {
    cellRenderProps: undefined,
    rowPrefix: jest.fn()
  }
};

const componentWithContext = props => {
  return (
    //@ts-ignore
    <TableContext.Provider value={context}>
      <CellData {...props} />
    </TableContext.Provider>
  );
};

const setUp = (props?) => mount(componentWithContext(props));

describe("CellData component", () => {
  let component;
  const column = getStaticColumn();
  const celllDataProps = {
    value: "35",
    row: getStaticRow(2),
    column,
    xIndex: 1,
    yIndex: 2,
    columnLevel: 1
  };
  beforeEach(() => {
    component = setUp(celllDataProps);
  });

  it("rendered CellData corectly", () => {
    expect(component).toMatchSnapshot();
  });

  it("CellData has cotrect classes ", () => {
    expect(component.find(".dw-table__cell-data").length).toBe(1);
  });
});
