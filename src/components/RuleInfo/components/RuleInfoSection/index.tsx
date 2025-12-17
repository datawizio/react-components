import React from "react";
import clsx from "clsx";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import "./index.less";

export const RuleInfoSection: React.FC<{
  name: string;
  className?: string;
  tooltip?: string;
  disabled?: boolean;
}> = ({ name, children, className, disabled, tooltip }) => {
  const { t } = useTranslation();

  return (
    <div className={clsx("rule-info-section", className)}>
      <div className="rule-info-section-name">{t(name)}</div>
      {disabled ? (
        <div className="colored-tags">
          <Tooltip title={tooltip} placement="topLeft">
            <div className="colored-tag rule-info-section-content rule-info-section-content--disabled">
              {children}
            </div>
          </Tooltip>
        </div>
      ) : (
        <div className="rule-info-section-content" title={tooltip}>
          {children}
        </div>
      )}
    </div>
  );
};
