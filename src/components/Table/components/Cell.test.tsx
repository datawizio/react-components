import React from "react";
import { shallow } from "enzyme";
import Cell from "./Cell";

const setUp = (props?) => shallow(<Cell {...props} />);

xdescribe("Cell component", () => {
  let component;

  beforeEach(() => {
    component = setUp();
  });

  it("rendered Cell corectly", () => {
    expect(component).toMatchSnapshot();
  });

  it("Cell has 1 cell class ", () => {
    const cellClass = component.find(".dw-table__cell");
    expect(cellClass.length).toBe(1);
  });
});
