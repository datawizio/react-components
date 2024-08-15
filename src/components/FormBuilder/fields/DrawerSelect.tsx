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
  maxSelectedCount,
  multiple,
  options,
  loadData,
  onChange,
  loading,
  allowClear,
  showMarkers,
  ...restProps
}) => {
  const handleFieldChange = (value: any, selected: any) => {
    onChange?.(
      showMarkers
        ? {
            name,
            ...value
          }
        : {
            name,
            value,
            selected
          }
    );
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
        maxSelectedCount={maxSelectedCount}
        placeholder={placeholder}
        onChange={handleFieldChange}
        showMarkers={showMarkers}
        allowClear={allowClear || typeof allowClear === "undefined"}
      />
    </Form.Item>
  );
};
