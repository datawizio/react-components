import React, { FC, useContext } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../Button";
import { RuleInfoContext } from "../context";

interface ShowAllModal {
  dimensionName?: string;
}

const ShowAllModal: FC<ShowAllModal> = ({ dimensionName }) => {
  const { dispatch } = useContext(RuleInfoContext);
  const { t } = useTranslation();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch({
      type: "toggleModalShow",
      payload: { show: true, defaultActiveKey: [dimensionName] }
    });
  };

  return (
    <>
      <Button
        type="link"
        className="show-all-modal-button"
        onClick={handleClick}
      >
        {t("SHOW_ALL")}
      </Button>
    </>
  );
};

export default ShowAllModal;
