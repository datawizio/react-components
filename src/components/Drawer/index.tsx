import React from "react";
import { Drawer as AntDrawer } from "antd";
import { DrawerProps as AntDrawerProps } from "antd/lib/drawer";
import "./index.less";

export interface DrawerProps extends AntDrawerProps {
  actions?: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ actions, footer, ...props }) => {
  const internalFooter = footer ? (
    footer
  ) : actions ? (
    <div className="ant-drawer-actions">{actions}</div>
  ) : null;
  return <AntDrawer {...props} footer={internalFooter} />;
};

export default Drawer;
