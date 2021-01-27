import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Row, Col, Button, Input, notification } from "antd";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import {
  PollingPayload,
  PollingProps,
  PollingQuestion,
  PollingStep
} from "./types";
import "./index.less";

const Polling: React.FC<PollingProps> = ({ questions, onSubmit }) => {
  const { t } = useTranslation();
  const [steps, setSteps] = useState<PollingStep[]>([]);
  const [textValue, setTextValue] = useState<string>("");
  const [pollingShown, setPollingShown] = useState<boolean>(!!questions.length);

  const generateSteps = useCallback(() => {
    if (!questions || !questions.length) return;

    const result = questions.map((q: PollingQuestion, i: number) => {
      const step: PollingStep = {
        question_key: q.question_key,
        polling_template: q.polling_template,
        feedback_type: q.feedback_type,
        active: i === 0,
        id:
          String(new Date().getTime()) +
          String((Math.random() * 1000).toFixed())
      };

      if (q.feedback_type === "mark") {
        step.mark = null;
      }

      if (q.feedback_type === "text") {
        step.comment = "";
      }

      return step;
    });

    setSteps(result);
  }, [questions]);

  const goToNextStep = useCallback(
    stepIdx => {
      setSteps(prevState => {
        const prevStateCopy: PollingStep[] = [...prevState];

        prevStateCopy[stepIdx].active = false;

        const nextStep = prevStateCopy[stepIdx + 1];
        if (nextStep) {
          nextStep.active = true;
        }

        return prevStateCopy;
      });

      if (!steps[stepIdx + 1]) {
        notification.success({
          message: t("THANKS_FOR_FEEDBACK")
        });
      }
    },
    [steps, t]
  );

  const submit = useCallback(
    (mark = null, polled = true) => {
      const step = steps.find(step => step.active);
      if (!step) return;

      const payload: PollingPayload = {
        polling_template: step.polling_template,
        polled
      };

      if (step.feedback_type === "mark" && polled) {
        payload.mark = step.mark = mark;
      }

      if (step.feedback_type === "text" && polled) {
        payload.comment = step.comment;
      }

      onSubmit(payload);

      setTextValue("");

      if (!pollingShown) return;

      const stepIdx = steps.findIndex((el: PollingStep) => el.id === step.id);
      if (stepIdx === -1) return;

      polled && goToNextStep(stepIdx);
    },
    [goToNextStep, onSubmit, pollingShown, steps]
  );

  const close = useCallback(() => {
    setPollingShown(false);
    submit(null, false);
  }, [submit]);

  useEffect(() => {
    generateSteps();
  }, [generateSteps]);

  const templateMarks = useMemo(() => {
    return (
      <div className="polling-marks">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(mark => {
          return (
            <span
              key={mark}
              className="polling-mark"
              onClick={() => submit(mark)}
            >
              {mark}
            </span>
          );
        })}
      </div>
    );
  }, [submit]);

  const templateText = useMemo(() => {
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
          onClick={submit}
        >
          {t("SEND")}
        </Button>
      </div>
    );
  }, [submit, t, textValue]);

  const renderForm = useCallback(
    step => {
      switch (step.feedback_type) {
        case "mark":
          return templateMarks;
        case "text":
          return templateText;
      }
    },
    [templateMarks, templateText]
  );

  return pollingShown ? (
    <>
      {steps.map((step: PollingStep) => {
        return (
          step.active && (
            <Row className="polling-container" key={step.id}>
              <Col xs={24} lg={12} xl={8}>
                <p className="polling-question">{t(step.question_key)}</p>
              </Col>
              <Col xs={24} lg={12} xl={16}>
                <div className="polling-form">{renderForm(step)}</div>
              </Col>
              <CloseOutlined className="polling-close-btn" onClick={close} />
            </Row>
          )
        )
      })}
    </>
  ) : null;
};

export default Polling;
