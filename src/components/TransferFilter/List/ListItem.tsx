import * as React from "react";
import classNames from "classnames";
import { TransferFilterItem } from "../types";
import Checkbox from "../../Checkbox";

type ListItemProps = {
  item: TransferFilterItem;
  prefixCls: string;
  checked?: boolean;
  disabled?: boolean;
  onClick: (item: TransferFilterItem) => void;
};

const ListItem = (props: ListItemProps) => {
  const { item, checked, disabled, prefixCls, onClick } = props;

  const className = classNames({
    [`${prefixCls}-content-item`]: true,
    [`${prefixCls}-content-item-disabled`]: disabled || item.disabled,
    [`${prefixCls}-content-item-checked`]: checked
  });

  const listItem = (
    <li
      className={className}
      title={item.title}
      onClick={disabled || item.disabled ? undefined : () => onClick(item)}
    >
      <Checkbox checked={checked} disabled={disabled || item.disabled} />
      <span className={`${prefixCls}-content-item-text`}>{item.title}</span>
    </li>
  );

  return listItem;
};

export default React.memo(ListItem);
