import React from "react";

import { Form } from "antd";
import Select from "../../Select";

import { FieldSelectProps } from "../types";

export const FieldSelect: React.FC<FieldSelectProps> = ({
  allowClear,
  label,
  rules,
  name,
  initialValue,
  placeholder,
  options,
  onChange,
  onDeselect,
  ...restProps
}) => {
  const handleFieldChange = (value: any, selected: any) => {
    onChange &&
      onChange({
        name,
        value,
        selected
      });
  };

  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      initialValue={initialValue}
    >
      <Select
        {...restProps}
        options={options}
        placeholder={placeholder}
        onChange={handleFieldChange}
        onDeselect={onDeselect}
        allowClear={allowClear}
      />
    </Form.Item>
  );
};
