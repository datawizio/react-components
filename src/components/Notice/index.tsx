import React from "react";
import clsx from "clsx";
import "./index.less";

interface NoticeProps {
  content: JSX.Element | null;
  className?: string;
}

const Notice: React.FC<NoticeProps> = ({ content, className }) => {
  const classNames = clsx("dw-notice", {
    [className]: !!className
  });
  return <div className={classNames}>{content}</div>;
};

export default Notice;
