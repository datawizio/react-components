import React from "react";
import { List } from "antd";
import { ListItemTypeProps } from "./types";
import ListItemField from "./Field";
import ListItemHeader from "./Header";

const Item: ListItemTypeProps = props => <List.Item {...props} />;

Item.Field = ListItemField;
Item.Header = ListItemHeader;
Item.Meta = List.Item.Meta;

export default Item;
