import React from "react";

import { List } from "antd";

import { ListItemHeaderProps } from "./types.d";

const ListItemHeader: React.FC<ListItemHeaderProps> = ({ title }) => {
  return <List.Item className="list-item-header">{title}</List.Item>;
};

export default ListItemHeader;
