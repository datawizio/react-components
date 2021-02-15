import React, { useCallback, useContext, useRef } from "react";
import { Button } from "antd";
import clsx from "clsx";
import ConfigContext from "../ConfigProvider/context";
import { ButtonProps as AntButtonProps } from "antd/lib/button";

interface CheckboxButtonProps extends AntButtonProps {
  className?: string;
  checked?: boolean;
  text?: string;
  border?: boolean;
  highlight?: boolean;
  onChange?: (value: any) => void;
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
  const btnRef = useRef(null);

  const buttonClasses = clsx(className, {
    "dw-btn": true,
    "button-checkbox": true,
    "active": checked,
    "no-border": !border,
    "highlight": highlight
  });

  const handleButtonClick = useCallback(() => {
    onChange && onChange(!checked);
    // @ts-ignore
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
