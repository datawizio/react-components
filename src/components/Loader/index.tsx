import React from "react";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import "./index.less";

export interface LoaderProps {
  /**
   * Show/hide loader
   */
  loading?: boolean;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ loading, className, children }) => {
  return (
    <Spin
      spinning={loading}
      className="datawiz-loader"
      indicator={<LoadingOutlined />}
      wrapperClassName={className}
    >
      {children}
    </Spin>
  );
};

export default Loader;
