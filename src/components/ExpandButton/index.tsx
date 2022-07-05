import React from "react";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";

import "./index.less";

const { Text } = Typography;

interface ExpandButtonProps {
  listOpen: boolean;
  setListOpen: (isOpen: boolean) => void;
}

const ExpandButton: React.FC<ExpandButtonProps> = ({
  listOpen,
  setListOpen
}) => {
  const { t } = useTranslation();

  const handleClick = (isOpen: boolean) => () => {
    setListOpen(isOpen);
  };

  return (
    <span className="expand-button">
      {listOpen ? (
        //@ts-ignore
        <Text type="secondary" onClick={handleClick(false)}>
          ...{t("LESS")}
        </Text>
      ) : (
        //@ts-ignore
        <Text type="secondary" onClick={handleClick(true)}>
          ...{t("MORE")}
        </Text>
      )}
    </span>
  );
};

export default ExpandButton;
