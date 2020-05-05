import * as React from "react";

import { Menu as AntMenu } from "antd";
import { MenuProps as AntMenuProps } from "antd/lib/menu";

import "./index.less";

export interface MenuProps extends AntMenuProps {}

export type FCMenuProps = React.FC<MenuProps>;

export interface FCMenu extends FCMenuProps {
  Item: typeof AntMenu.Item;
  SubMenu: typeof AntMenu.SubMenu;
}

const Menu: FCMenu = props => {
  return <AntMenu {...props} />;
};

Menu.defaultProps = {
  theme: "dark"
};

Menu.Item = AntMenu.Item;
Menu.SubMenu = AntMenu.SubMenu;

export default Menu;
