import * as React from "react";
import AntdList from "antd/lib/list";
import Item from "./Item";

import { FCList, ListProps } from "./types.d";

import "./index.less";

const List: FCList = props => {
  return <AntdList {...props} />;
};

List.defaultProps = {
  bordered: true
};

List.Item = Item;

export default List;
export const _ListWithProps: React.FC<ListProps> = {} as any;
