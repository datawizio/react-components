import "jsdom-global/register";
import React from "react";
import { mount, shallow } from "enzyme";
import Table from "./index";
import {
  columns,
  dataSource,
  getStaticColumn,
  getStaticDataSource,
  sortable
} from "./__mocks__";

const mockProps = {
  height: "auto",
  width: "auto",

  sortable,
  columns: getStaticDataSource(),
  dataSource: getStaticDataSource()
};

describe("Table component", () => {
  let component;

  beforeEach(() => {
    //@ts-ignore
    component = shallow(<Table {...mockProps} />);
  });

  it("rendered Table corectly", () => {
    expect(component).toMatchSnapshot();
  });
});
