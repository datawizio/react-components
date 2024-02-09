import React, { useCallback } from "react";
import { Form } from "antd";
import Checkbox from "../../Checkbox";
import { FieldCheckboxProps } from "../types";
import { CheckboxChangeEvent } from "antd/es/checkbox/Checkbox";
import InfoTooltip from "../../InfoTooltip";
//import "../../InfoTooltip/index.less";

export const FieldCheckbox: React.FC<FieldCheckboxProps> = React.memo(
  ({ label, rules, name, placeholder, disabled, onChange, infoTooltip }) => {
    const handleFieldChange = useCallback(
      ({ target: { checked } }: CheckboxChangeEvent) => {
        onChange &&
          onChange({
            name,
            value: checked
          });
      },
      [onChange, name]
    );

    return (
      <Form.Item
        name={name}
        label={label}
        rules={rules}
        valuePropName="checked"
      >
        <Checkbox disabled={disabled} onChange={handleFieldChange}>
          {placeholder}
          {infoTooltip && <InfoTooltip {...infoTooltip} />}
        </Checkbox>
      </Form.Item>
    );
  }
);
