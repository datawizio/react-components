import { Form } from "antd";
import { Interval } from "./Interval";
import React, { useMemo, useContext } from "react";
import ConfigContext from "../../../ConfigProvider/context";
import { FieldIntervalProps, IntervalType } from "../../types";

import "./styles.less";
import { Rule } from "antd/lib/form";

const intervalValidation = t => ({
  validator(rule: Rule, value: IntervalType) {
    if (
      value.from === null ||
      value.to === null ||
      value.from.isBefore(value.to)
    ) {
      return Promise.resolve();
    }
    //@ts-ignore
    return Promise.reject(rule.message || t("INVALID_INTERVAL"));
  }
});

export const FieldInterval: React.FC<FieldIntervalProps> = ({
  name,
  label,
  rules,
  format,
  picker,
  minDate,
  maxDate,
  onChange
}) => {
  const { translate } = useContext(ConfigContext);

  const handleChange = (value: IntervalType) => {
    onChange && onChange({ name, value });
  };

  const internalRules = useMemo(() => {
    const validatorRule = intervalValidation(translate);
    return rules ? rules.concat([validatorRule]) : [validatorRule];
  }, [rules]);

  return (
    <Form.Item
      name={name}
      label={label}
      rules={internalRules}
      className="field-interval"
    >
      <Interval
        format={format}
        picker={picker}
        minDate={minDate}
        maxDate={maxDate}
        onChange={handleChange}
      />
    </Form.Item>
  );
};
