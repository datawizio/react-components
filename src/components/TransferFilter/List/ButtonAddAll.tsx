import React, { useMemo } from "react";
import PlusCircleOutlined from "@ant-design/icons/PlusCircleOutlined";
import MinusCircleOutlined from "@ant-design/icons/MinusCircleOutlined";
import { DataNode } from "rc-tree-select/es/interface";
import { ICheckedItem } from "../types";

interface ButtonAddAllProps {
  node?: DataNode;
  selected: Set<string>;
  onClick?: (items: ICheckedItem[], checked: boolean) => void;
}

export const ButtonAddAll: React.FC<ButtonAddAllProps> = ({
  node,
  selected,
  onClick
}) => {
  const { minus, children } = useMemo(() => {
    const children = [];
    let minus = true;
    if (!node.children || node.children.length === 0)
      return {
        children,
        minus
      };

    node.children.forEach(item => {
      if (!item.disabled) {
        if (!selected.has(item.key as string)) minus = false;
        children.push({
          key: item.key as string,
          title: item.sourceTitle as string
        });
      }
    });

    return { children, minus };
  }, [node.children, selected]);

  const handleClick = (checked: boolean) => {
    onClick(children, checked);
  };

  const handlePlusClick = e => {
    e.stopPropagation();
    handleClick(true);
  };

  const handleMinusClick = e => {
    e.stopPropagation();
    handleClick(false);
  };
  const hasChildren = node && node.children && node.children.length > 0;

  if (!hasChildren) return null;
  return minus ? (
    <MinusCircleOutlined
      onClick={handleMinusClick}
      className="button-add-all"
    />
  ) : (
    <PlusCircleOutlined onClick={handlePlusClick} className="button-add-all" />
  );
};
