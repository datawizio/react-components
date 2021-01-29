import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Text from "./templates/Text";
import Marks from "./templates/Marks";
import { StepProps } from "../types";
import { Col } from "antd";

const Step: React.FC<StepProps> = props => {
  const { t } = useTranslation();
  const { step } = props;

  const template = useMemo(() => {
    switch (step.feedback_type) {
      case "mark":
        return <Marks {...props} />;
      case "text":
        return <Text {...props} />;
      default:
        return null;
    }
  }, [props, step.feedback_type]);

  return (
    <>
      <Col xs={24} lg={12} xl={8}>
        <p className="polling-question">{t(step.question_key)}</p>
      </Col>
      <Col xs={24} lg={12} xl={16}>
        <div className="polling-form">{template}</div>
      </Col>
    </>
  );
};

export default Step;
