import React from "react";

import { Input } from "antd";
import { SearchProps } from "antd/lib/input";

import "./index.less";

export interface SearchInputProps extends SearchProps {}

const SearchInput: React.FC<SearchInputProps> = props => {
  return <Input.Search {...props} allowClear />;
};

export default SearchInput;
