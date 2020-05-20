import React from "react";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import "./index.less";

export interface LoaderProps {
  /**
   * Show/hide loader
   */
  loading?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ loading, children }) => {
  return (
    <Spin
      spinning={loading}
      className="datawiz-loader"
      indicator={<LoadingOutlined />}
    >
      {children}
    </Spin>
  );
};

export default Loader;
