import React, { useMemo } from "react";
import { Form } from "antd";
import { Interval } from "./Interval";
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
    return Promise.reject(rule.message);
  }
});

export const FieldInterval: React.FC<FieldIntervalProps> = ({
  name,
  label,
  rules,
  format,
  picker,
  onChange
}) => {
  const handleChange = (value: IntervalType) => {
    onChange({ name, value });
  };
  const internalRules = useMemo(() => {
    return rules ? rules.concat([intervalValidation]) : [intervalValidation];
  }, [rules]);
  return (
    <Form.Item
      name={name}
      label={label}
      rules={internalRules}
      className="field-interval"
    >
      <Interval picker={picker} onChange={handleChange} format={format} />
    </Form.Item>
  );
};
