import React, { useContext } from "react";

import { Form } from "antd";
import { FieldDrawerSelectProps } from "../types";
import ConfigContext from "../../ConfigProvider/context";
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
  const { translate } = useContext(ConfigContext);
  const handleFieldChange = (value: any, selected: any) => {
    console.log(value);
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
        drawerSearchPlaceholder={translate("SEARCH")}
        submitText={translate("SUBMIT")}
        cancelText={translate("CANCEL")}
        loadingText={translate("LOADING")}
        noDataText={translate("NO_DATA")}
        loadData={loadData}
        loading={loading}
        placeholder={placeholder}
        onChange={handleFieldChange}
        allowClear={true}
      />
    </Form.Item>
  );
};
