import React from "react";

import { Layout as AntLayout } from "antd";

import "./index.less";
import clsx from "clsx";

export interface TopBarProps {
  theme?: "light" | "dark";
}

const TopBar: React.FC<TopBarProps> = ({ children, theme }) => {
  const className = clsx({
    "top-bar": true,
    "dw-dark": theme === "dark"
  });
  return <AntLayout.Header className={className}>{children}</AntLayout.Header>;
};

export default TopBar;
