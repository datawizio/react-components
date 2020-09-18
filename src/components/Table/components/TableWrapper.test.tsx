import React from "react";
import { shallow } from "enzyme";
import TableWrapper from "./TableWrapper";

const setUp = (props?) => shallow(<TableWrapper {...props} />);

describe("TableWrapper component", () => {
  let component;
  let instance;

  beforeEach(() => {
    component = setUp({
      style: {
        height: 1,
        width: 1
      }
    });
    instance = component.instance();
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
