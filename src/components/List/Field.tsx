import React, { useContext } from "react";
import List from "../List";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { ListItemFieldProps } from "./types";
import ConfigContext from "../ConfigProvider/context";

const ListItemField: React.FC<ListItemFieldProps> = ({
  title,
  description,
  value,
  customIcon,
  id,
  onClick
}) => {
  const { direction } = useContext(ConfigContext);
  const icon = direction === "rtl" ? <LeftOutlined /> : <RightOutlined />;
  return (
    <List.Item onClick={onClick} className="list-item-field" id={id || ""}>
      <div className="list-item-field-container">
        <List.Item.Meta title={title} description={description} />
        <div className="value-container">{value}</div>
      </div>
      {customIcon !== null ? customIcon : icon}
    </List.Item>
  );
};

export default ListItemField;
