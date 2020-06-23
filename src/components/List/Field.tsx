import React from "react";

import List from "../List";
import { RightOutlined } from "@ant-design/icons";
import { ListItemFieldProps } from "./types.d";

const ListItemField: React.FC<ListItemFieldProps> = ({
  title,
  description,
  value,
  onClick
}) => {
  return (
    <List.Item onClick={onClick} className="list-item-field">
      <div className="list-item-field-container">
        <List.Item.Meta title={title} description={description} />
        <div className="value-container">{value}</div>
      </div>
      <RightOutlined />
    </List.Item>
  );
};

export default ListItemField;
