import React, { useCallback, useContext } from "react";
import { Form, Switch } from "antd";
import { FieldCheckboxProps } from "../types";
import ConfigContext from "../../ConfigProvider/context";

export const FieldSwitch: React.FC<FieldCheckboxProps> = React.memo(
  ({ label, rules, name, onChange }) => {
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
          onChange={handleFieldChange}
          className={direction === "rtl" ? "ant-switch-rtl" : ""}
        />
      </Form.Item>
    );
  }
);
