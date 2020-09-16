import React, { FC } from "react";
import { shallow } from "enzyme";
import Cell from "./Cell";

const setUp = (props?) => shallow(<Cell {...props} />);

describe("Cell component", () => {
  let component;
  let instance;

  beforeEach(() => {
    component = setUp();
    instance = component.instance();
  });

  it("rendered Cell corectly", () => {
    expect(component).toMatchSnapshot();
  });

  it("Cell has 1 cell class ", () => {
    const cellClass = component.find(".dw-table__cell");
    expect(cellClass.length).toBe(1);
  });
});
