import React, { ReactNode, useMemo } from "react";
import { Form } from "antd";
import Select from "../../Select";
import { FieldSelectProps } from "../types";
import InfoTooltip from "../../InfoTooltip";
//import "../../InfoTooltip/index.less";

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
  infoTooltip,
  ...restProps
}) => {
  const formItemLabel: string | ReactNode = useMemo(() => {
    if (label && infoTooltip) {
      return (
        <div className="label-with-info">
          {label}
          <InfoTooltip {...infoTooltip} />
        </div>
      );
    }
    return label;
  }, [infoTooltip, label]);

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
      label={formItemLabel}
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
