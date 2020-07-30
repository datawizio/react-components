import React, { ReactElement } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";

import "./index.less";

interface PageHeaderProps {
  /**
   * Page title
   */
  title: string | ReactElement;
  className?: string;

  onBack?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  className,
  onBack,
  children
}) => {
  return (
    <div className={`page-header ${className}`}>
      {onBack && (
        <span className="page-header-back">
          <ArrowLeftOutlined onClick={onBack} />
        </span>
      )}
      <span className="page-header-title">{title}</span>
      {children}
    </div>
  );
};

export default PageHeader;
