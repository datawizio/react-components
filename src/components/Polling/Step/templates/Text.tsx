import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { StepProps } from "../../types";

const Text: React.FC<StepProps> = ({ onSubmit }) => {
  const { t } = useTranslation();

  const [textValue, setTextValue] = useState<string>("");

  const handleSubmit = () => {
    onSubmit(textValue, true);
  }

  return (
      <div className="polling-text">
        <Input
          addonBefore={<EditOutlined />}
          maxLength={500}
          onChange={e => setTextValue(e.target.value)}
        />
        <Button
          className="polling-send-btn"
          disabled={!textValue}
          onClick={handleSubmit}
        >
          {t("SEND")}
        </Button>
      </div>
    );
};

export default Text;
