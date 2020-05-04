import React from "react";

import { Menu as AntMenu } from "antd";
import { MenuProps as AntMenuProps } from "antd/lib/menu";

import "./index.less";

export interface MenuProps extends AntMenuProps {}

const Menu: React.FC<MenuProps> = props => {
  return <AntMenu {...props} />;
};

Menu.defaultProps = {
  theme: "dark"
};

export default Menu;

export const Item = AntMenu.Item;
export const SubMenu = AntMenu.SubMenu;
