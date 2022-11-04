import React, { useCallback, useContext, useRef } from "react";
import { Button } from "antd";
import clsx from "clsx";
import ConfigContext from "../ConfigProvider/context";
import { ButtonProps as AntButtonProps } from "antd/lib/button";

export interface CheckboxButtonProps extends Omit<AntButtonProps, "onChange"> {
  className?: string;
  checked?: boolean;
  text?: string;
  border?: boolean;
  highlight?: boolean;
  onChange?: (value: boolean) => void;
}

const CheckboxButton: React.FC<CheckboxButtonProps> = ({
  className,
  checked,
  text,
  border,
  highlight,
  onChange,
  ...props
}) => {
  const { translate } = useContext(ConfigContext);
  const btnRef = useRef<HTMLElement>(null);

  const buttonClasses = clsx(className, {
    "dw-btn": true,
    "button-checkbox": true,
    "active": checked,
    "no-border": !border,
    "highlight": highlight
  });

  const handleButtonClick = useCallback(() => {
    onChange && onChange(!checked);

    btnRef?.current?.blur();
  }, [checked, onChange]);

  return (
    <Button
      {...props}
      ref={btnRef}
      className={buttonClasses}
      onClick={handleButtonClick}
    >
      {text && translate(text)}
    </Button>
  );
};

CheckboxButton.defaultProps = {
  border: true
};

export default CheckboxButton;
