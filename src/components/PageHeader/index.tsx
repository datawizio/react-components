import React from "react";

import "./index.less";

interface PageHeaderProps {
  /**
   * Page title
   */
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, children }) => {
  return (
    <div className="page-header">
      <span className="page-header-title">{title}</span>
      {children}
    </div>
  );
};

export default PageHeader;
