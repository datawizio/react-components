import "jsdom-global/register";
import React from "react";
import { mount } from "enzyme";
import TableWrapper from "./TableWrapper";
import { TableContext } from "../context";

const context = {
  tableState: { dTypesConfig: [] },
  tableProps: {
    autoHeight: false,
    responsiveTable: false
  }
};

const componentWithContext = props => {
  return (
    //@ts-ignore
    <TableContext.Provider value={context}>
      <TableWrapper {...props} />
    </TableContext.Provider>
  );
};

const setUp = (props?) => mount(componentWithContext(props));

describe("TableWrapper component", () => {
  let component;

  beforeEach(() => {
    component = setUp({
      style: {
        height: 1,
        width: 1
      }
    });
  });

  it("rendered TableWrapper corectly", () => {
    expect(component).toMatchSnapshot();
  });

  it("TableWrapperBar has 1 cell class ", () => {
    const tableWrapperClass = component.find(".dw-table__wrapper");
    expect(tableWrapperClass.length).toBe(1);
  });

  it("TableWrapperlBar has table element", () => {
    const tableElement = component.find("table");
    expect(tableElement.length).toBe(1);
  });
});
