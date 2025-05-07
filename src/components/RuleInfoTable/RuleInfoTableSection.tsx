import React from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import "./index.less";

export const RuleInfoTableSection: React.FC<{
  name: string;
  className?: string;
}> = ({ name, children, className }) => {
  const { t } = useTranslation();

  return (
    <div className={clsx("rule-info-section", className)}>
      <div className="rule-info-section-name">{t(name)}</div>
      <div className="rule-info-section-content">{children}</div>
    </div>
  );
};
