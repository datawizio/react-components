import React from "react";
import PlusCircleOutlined from "@ant-design/icons/PlusCircleOutlined";
import { DataNode } from "rc-tree-select/es/interface";
import { ICheckedItem } from "../types";

interface ButtonAddAllProps {
  node?: DataNode;
  onClick?: (items: ICheckedItem[]) => void;
}

export const ButtonAddAll: React.FC<ButtonAddAllProps> = ({
  node,
  onClick
}) => {
  const handleClick = e => {
    e.stopPropagation();
    const children = [];
    node.children.forEach(item => {
      if (!item.disabled)
        children.push({
          key: item.key as string,
          title: item.sourceTitle as string
        });
    });
    onClick(children);
  };

  return node && node.children && node.children.length > 0 ? (
    <PlusCircleOutlined onClick={handleClick} className="button-add-all" />
  ) : null;
};
