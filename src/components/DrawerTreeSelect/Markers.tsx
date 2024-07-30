import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import AntTreeSelect from "./antd/AntTreeSelect";
import TreeSelect from "../TreeSelect";

interface MarkersProps {
  value?: string[] | number[];
  treeData?: any;
  onChange?: any;
  loadChildren?: (id: string, filters?: any) => Promise<any>;
  placeholder?: string;
  style?: React.CSSProperties;
}

export const Markers: React.FC<MarkersProps> = React.memo(
  ({ value, treeData, onChange, loadChildren, placeholder, style }) => {
    const { t } = useTranslation();

    const handleChange = value => {
      onChange && onChange(value);
    };

    const handleSearch = useCallback((inputValue: string, treeNode: any) => {
      return treeNode.title.toLowerCase().includes(inputValue.toLowerCase());
    }, []);

    const loadData = async node => {
      if (node.children?.length) return;
      await loadChildren(node);
    };

    return (
      <TreeSelect
        value={value}
        treeData={treeData}
        treeCheckable={true}
        placeholder={placeholder ?? t("SHOP_MARKERS")}
        showCheckedStrategy={AntTreeSelect.SHOW_PARENT}
        loadData={loadData}
        onChange={handleChange}
        filterTreeNode={handleSearch}
        className="select-markers-field"
        style={style}
      />
    );
  }
);

Markers.defaultProps = {
  value: [],
  treeData: []
};
