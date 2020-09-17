import "jsdom-global/register";
import React from "react";
import { mount, shallow } from "enzyme";
import Table from "./index";
import { TableProps } from "./types";
import { columns, dataSource, sortable } from "./__mocks__";

const setUp = (props?: TableProps) => mount(<Table {...props} />);
describe("Table component", () => {
  let component;

  beforeEach(() => {
    // console.log(columns);
    // console.log(dataSource);
    // console.log(sortable);

    component = setUp({
      height: "450px",
      columns: columns,
      sortable: sortable,
      dataSource: dataSource
    });
    console.log(component.debug(), "qqqq");
  });

  it("rendered Table corectly", () => {
    expect(component);
  });
});
