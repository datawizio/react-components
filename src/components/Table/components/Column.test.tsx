import React from "react";
import { shallow } from "enzyme";

import Column from "./Column";
import { TableContext } from "../context";
import { getStatickModel } from "../__mocks__";

const context = {
  dispatch: jest.fn()
};

const componentWithContext = props => {
  return (
    //@ts-ignore
    <TableContext.Provider value={context}>
      <Column {...props} />
    </TableContext.Provider>
  );
};

const setUp = (props?) => shallow(componentWithContext(props));

describe("Column component", () => {
  let component;
  const columnProps = {
    model: getStatickModel(2),
    onClick: jest.fn(),
    canDrop: false,
    isOver: false
  };
  beforeEach(() => {
    component = setUp(columnProps);
  });

  it("Render column  corectly", () => {
    expect(component).toMatchSnapshot();
  });
});
