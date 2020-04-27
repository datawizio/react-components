import AntdList, { ListProps as AntdListProps } from "antd/lib/list";

export interface ListProps<D = any> extends AntdListProps<D> {}

export type FCList = {
  Item: typeof AntdList.Item;
} & import("react").FC<ListProps>;
