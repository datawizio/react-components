import React, { useCallback, useRef } from "react";
import i18next from "i18next";
import { Button } from "antd";
import clsx from "clsx";

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
      {!icon && text && i18next.t(text)}
    </Button>
  );
};

export default CheckboxButton;