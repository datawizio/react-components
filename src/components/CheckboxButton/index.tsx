import React, { useCallback, useContext, useRef } from "react";
import { Button } from "antd";
import clsx from "clsx";
import ConfigContext from "../ConfigProvider/context";

interface CheckboxButtonProps {
  className?: string;
  checked?: boolean;
  icon?: JSX.Element;
  text?: string;
  onChange?: (checked: boolean) => void;
}

const CheckboxButton: React.FC<CheckboxButtonProps> = ({
  className,
  checked,
  icon,
  text,
  onChange
}) => {
  const { translate } = useContext(ConfigContext);
  const btnRef = useRef(null);

  let buttonClasses = clsx({
    "button-checkbox": true,
    "active": checked
  });

  if (className) {
    buttonClasses = `${buttonClasses} ${className}`;
  }

  const handleButtonClick = useCallback(() => {
    onChange && onChange(!checked);
    // @ts-ignore
    btnRef?.current?.blur();
  }, [checked, onChange]);

  return (
    <Button
      ref={btnRef}
      icon={!text && icon}
      className={buttonClasses}
      onClick={handleButtonClick}
    >
      {!icon && text && translate(text)}
    </Button>
  );
};

export default CheckboxButton;