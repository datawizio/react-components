import React from "react";
import { ListProps as AntdListProps } from "antd/lib/list";
import { ListItemTypeProps as AntdListItemTypeProps } from "antd/lib/list/Item";

export interface ListProps<D = any> extends AntdListProps<D> {}

export interface ListItemFieldProps {
  title: string;
  description: string;
  value?: string;
  customIcon?: React.ReactNode | null;
  id?: string;
  onClick?: () => void;
}

export interface ListItemHeaderProps {
  title: string;
}

export interface ListItemTypeProps extends AntdListItemTypeProps {
  Field: React.FC<ListItemFieldProps>;
  Header: React.FC<ListItemHeaderProps>;
}

export type FCList = {
  Item: ListItemTypeProps;
} & React.FC<ListProps>;
