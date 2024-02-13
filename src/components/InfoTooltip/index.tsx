import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { CloseOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import clsx from "clsx";
import Button from "../Button";
import { TooltipPlacement } from "antd/es/tooltip";
import "./index.less";

export interface InfoTooltipProps {
  description?: string | React.ReactNode;
  detailedLink?: string;
  detailedTextKey?: string;
  className?: string;
  placement?: TooltipPlacement;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement | null;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({
  description,
  detailedLink,
  detailedTextKey,
  placement,
  className,
  getPopupContainer
}) => {
  const { t } = useTranslation();

  const [tooltipVisible, setTooltipVisible] = useState(false);

  const buttonClassNames = clsx({
    "info-tooltip-button": true,
    "info-tooltip-button-highlighted": tooltipVisible
  });

  const tooltipClassNames = clsx(className || "", {
    "info-tooltip": true,
    "info-tooltip-theme-light": window.theme !== "dark",
    "info-tooltip-theme-dark": window.theme === "dark"
  });

  const closeTooltip = useCallback(() => {
    setTooltipVisible(false);
  }, []);

  const tooltip = useMemo(() => {
    return description ? (
      <div className="info-tooltip-content">
        <CloseOutlined onClick={closeTooltip} />
        {description}
        <p className="info-tooltip-detailed">
          <a href={detailedLink} target="_blank" rel="noreferrer">
            {detailedTextKey ? t(detailedTextKey) : t("DETAILED")}...
          </a>
        </p>
      </div>
    ) : (
      <></>
    );
  }, [closeTooltip, description, detailedLink, detailedTextKey, t]);

  const onVisibleChangeCallback = useCallback((visible: boolean) => {
    setTooltipVisible(visible);
  }, []);

  return description ? (
    <Tooltip
      title={tooltip}
      placement={placement as TooltipPlacement}
      trigger={["click"]}
      overlayClassName={tooltipClassNames}
      visible={tooltipVisible}
      onVisibleChange={onVisibleChangeCallback}
      getPopupContainer={getPopupContainer}
    >
      <Button
        className={buttonClassNames}
        icon={<InfoCircleOutlined />}
        type="link"
      />
    </Tooltip>
  ) : null;
};

export default InfoTooltip;
