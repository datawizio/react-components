import React from "react";
import { shallow } from "enzyme";
import Table from "./index";
import CellData from "./components/CellData";
import { TableProps } from "./types";

const setUp = (props?: TableProps) => shallow(<Table {...props} />);

describe("Table component", () => {
  let component;
  let instance;

  beforeEach(() => {
    component = setUp();
    instance = component.instance();
  });

  it("rendered Table corectly", () => {
    expect(component).toMatchSnapshot();
  });

  describe("Cell Data", () => {
    it("CellData render corectly", () => {});
  });

  // describe("Table handlers", () => {
  //   it("handle table change", () => {
  //     instance.handleExpandRow();
  //   });
  // });
});
