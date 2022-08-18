import React, { useCallback, useContext } from "react";
import { Form } from "antd";
import { FieldSwitchProps } from "../types";
import ConfigContext from "../../ConfigProvider/context";
import Switch from "../../Switch";

export const FieldSwitch: React.FC<FieldSwitchProps> = React.memo(
  ({
    label,
    placeholder,
    rules,
    name,
    onChange,
    disabled,
    title,
    checkedChildren,
    unCheckedChildren,
    loading,
    size
  }) => {
    const { direction } = useContext(ConfigContext);

    const handleFieldChange = useCallback(
      (checked: boolean) => {
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
        <Switch
          placeholder={placeholder}
          onChange={handleFieldChange}
          disabled={disabled}
          title={title}
          checkedChildren={checkedChildren}
          unCheckedChildren={unCheckedChildren}
          loading={loading}
          size={size}
          className={direction === "rtl" ? "ant-switch-rtl" : ""}
        />
      </Form.Item>
    );
  }
);
