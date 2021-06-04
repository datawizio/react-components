import * as React from "react";
import { createPortal } from "react-dom";

import Button from "../Button";
import { ButtonProps } from "antd/lib/button";

import "./index.less";

export interface SideButtonProps extends ButtonProps {
  text: string;
  className: string;
  renderTo?: Element;
  icon: React.ReactNode;
  side?: "left" | "right";
  extra?: React.ReactNode;
}

const SideButton: React.FC<SideButtonProps> = props => {
  const {
    className,
    icon,
    text,
    side,
    renderTo,
    style,
    extra,
    ...restProps
  } = props;

  return createPortal(
    <div
      style={style}
      className={`side-button-container side-button-container--${side} ${className}`}
    >
      <Button {...restProps} className={"side-button side-button--" + side}>
        {side === "right" && (
          <>
            <span className="side-button__icon">{icon}</span>
            <span className="side-button__text">{text}</span>
          </>
        )}

        {side === "left" && (
          <>
            <span className="side-button__text">{text}</span>
            <span className="side-button__icon">{icon}</span>
          </>
        )}
      </Button>

      {extra}
    </div>,
    renderTo
  );
};

SideButton.defaultProps = {
  side: "right",
  renderTo: window.document.body
};

export default SideButton;
