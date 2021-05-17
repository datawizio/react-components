import React from "react";

import { Form } from "antd";

import DrawerTreeSelect from "../../DrawerTreeSelect";

import { FieldDrawerTreeSelectProps } from "../types";

export const FieldDrawerTreeSelect: React.FC<FieldDrawerTreeSelectProps> = ({
  drawerTitle,
  label,
  name,
  initialValue,
  multiple,
  placeholder,
  rules,
  onChange,
  level,
  forceOnChange, // prevent object return
  ...restProps
}) => {
  const handleFieldChange = (obj: any) => {
    if (!multiple && obj.value.length === 0) obj.value = "";
    onChange &&
      onChange({
        name,
        ...obj
      });
  };
  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      initialValue={initialValue}
    >
      <DrawerTreeSelect
        placeholder={placeholder}
        drawerTitle={drawerTitle ? drawerTitle : placeholder}
        level={level ?? 1}
        treeNodeFilterProp="title"
        treeCheckable={true}
        showSearch
        onChangeReturnObject={forceOnChange ? undefined : handleFieldChange}
        allowClear
        multiple={multiple}
        {...restProps}
      />
    </Form.Item>
  );
};
