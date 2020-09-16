import "jsdom-global/register";
import React from "react";
import { shallow, render, mount } from "enzyme";
import Column from "./Column";
import { TableContext } from "../context";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { model } from "../__mocks__";

const WithProvider = props => (
  <DndProvider backend={HTML5Backend}>
    <TableContext.Provider
      // @ts-ignore
      value={{
        dispatch: jest.fn()
      }}
    >
      <Column {...props} />
    </TableContext.Provider>
  </DndProvider>
);
const setUp = (props?) => mount(<WithProvider {...props} />);

const columnProps = {
  model,
  style: {},
  onClick: jest.fn(),
  multipleSorting: jest.fn(),
  level: 1
};

describe("Column component", () => {
  let component;

  beforeEach(() => {
    component = setUp(columnProps).childAt(0);
  });

  it("rendered Column corectly", () => {
    console.log(component);
    expect(component).toMatchSnapshot();
  });
});
