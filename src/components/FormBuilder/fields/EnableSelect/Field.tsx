import React, { useCallback } from "react";

import Checkbox from "../../../Checkbox";
import { EnableSelectValueType } from ".";
import { IFormFieldChanged } from "../../types";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

export interface FieldEnableSelectFieldProps {
  name: string | string[];
  placeholder: string;
  value?: EnableSelectValueType;
  renderField: (value: EnableSelectValueType) => any;
  onChange: (change: IFormFieldChanged<EnableSelectValueType>) => void;
}

export const Field: React.FC<FieldEnableSelectFieldProps> = ({
  placeholder,
  value,
  name,
  onChange,
  renderField
}) => {
  const renderValueField = useCallback(() => renderField(value), [
    renderField,
    value.value,
    value.enabled
  ]);

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    onChange &&
      onChange({
        name,
        value: {
          value: value.value,
          enabled: e.target.checked
        }
      });
  };

  return (
    <>
      <Checkbox checked={value.enabled} onChange={handleCheckboxChange}>
        {placeholder}
      </Checkbox>
      {renderValueField()}
    </>
  );
};
