import * as React from "react";
import { createPortal } from "react-dom";

import Button from "../Button";
import { ButtonProps } from "antd/lib/button";

import "./index.less";

export interface SideButtonProps extends ButtonProps {
  text: string;
  renderTo?: Element;
  icon: React.ReactNode;
  side?: "left" | "right";
}

const SideButton: React.FC<SideButtonProps> = props => {
  const { icon, text, side, renderTo, ...restProps } = props;

  console.log(renderTo);

  return createPortal(
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
    </Button>,
    renderTo
  );
};

SideButton.defaultProps = {
  side: "right",
  renderTo: window.document.body
};

export default SideButton;
