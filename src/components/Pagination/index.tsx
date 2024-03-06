import React from "react";
import { Pagination as AntPagination, PaginationProps } from "antd";
import "./index.less";

const Pagination = (props: PaginationProps) => {
  return <AntPagination {...props} />;
};

export default Pagination;
