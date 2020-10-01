import React from "react";
import { shallow } from "enzyme";
import ToolBar from "./ToolBar";

const setUp = (props?) => shallow(<ToolBar {...props} />);

describe("ToolBar component", () => {
  let component;
  let instance;

  beforeEach(() => {
    component = setUp();
    instance = component.instance();
  });

  it("rendered ToolBar corectly", () => {
    expect(component).toMatchSnapshot();
  });

  it("ToolBar has 1 toolbaR class ", () => {
    const cellClass = component.find(".dw-table__toolbar");
    expect(cellClass.length).toBe(1);
  });
});
