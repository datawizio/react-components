import React from "react";

import { BackTop as AntBackTop } from "antd";
import { UpOutlined } from "@ant-design/icons";

import "./index.less";

const BackTop = () => {
  return (
    <AntBackTop className="dw-back-top">
      <div className="ant-back-top-content">
        <div className="ant-back-top-icon">
          <UpOutlined />
        </div>
      </div>
    </AntBackTop>
  );
};

export default BackTop;
