import "jsdom-global/register";
import React from "react";
import { Menu as AntMenu } from "antd";
import { shallow } from "enzyme";

import Menu from "./index";

const mockProps = {
  Item: AntMenu.Item,
  SubMenu: AntMenu.SubMenu,
  ItemGroup: AntMenu.ItemGroup,
  Divider: AntMenu.Divider,
};

const setUp = (props?) => shallow(<Menu {...props} />);

describe("Menu component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("Menu' rendered correctly", () => {
    expect(component).toMatchSnapshot();
  });
});
