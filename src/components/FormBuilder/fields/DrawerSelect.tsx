import React from "react";

import { Form } from "antd";
import { FieldDrawerSelectProps } from "../types";
import DrawerSelect from "../../DrawerSelect";

export const FieldDrawerSelect: React.FC<FieldDrawerSelectProps> = ({
  label,
  rules,
  name,
  initialValue,
  placeholder,
  multiple,
  options,
  loadData,
  onChange,
  loading,
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
      <DrawerSelect
        {...restProps}
        multiple={multiple ? multiple : false}
        options={options}
        drawerTitle={placeholder}
        loadData={loadData}
        loading={loading}
        placeholder={placeholder}
        onChange={handleFieldChange}
        allowClear={true}
      />
    </Form.Item>
  );
};
