import React, { useContext } from "react";

import { Form } from "antd";

import DrawerTreeSelect from "../../DrawerTreeSelect";

import { FieldDrawerTreeSelectProps } from "../types";
import ConfigContext from "../../ConfigProvider/context";

export const FieldDrawerTreeSelect: React.FC<FieldDrawerTreeSelectProps> = ({
  drawerTitle,
  label,
  name,
  initialValue,
  multiple,
  placeholder,
  rules,
  onChange,
  ...restProps
}) => {
  const { translate } = useContext(ConfigContext);

  const handleFieldChange = (value: any, selected: any) => {
    if (!multiple && value.length === 0) value = "";
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
      <DrawerTreeSelect
        placeholder={placeholder}
        drawerTitle={drawerTitle ? drawerTitle : placeholder}
        drawerSearchPlaceholder={translate("SEARCH")}
        submitText={translate("SUBMIT")}
        loadingText={translate("LOADING")}
        noDataText={translate("NO_DATA")}
        cancelText={translate("CANCEL")}
        selectAllText={translate("ALL")}
        level={1}
        treeNodeFilterProp="title"
        treeCheckable={true}
        showSearch
        onChange={handleFieldChange}
        allowClear
        multiple={multiple}
        {...restProps}
      />
    </Form.Item>
  );
};
