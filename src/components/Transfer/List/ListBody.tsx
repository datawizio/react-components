import * as React from "react";
import { ElementOf, Omit, tuple } from "antd/es/_util/type";
import { TransferItem } from "../types";
import { TransferListProps } from "./index";
import ListItem from "./ListItem";
import { SkeletonListItem } from "./Skeleton";

export const OmitProps = tuple("checkedKeys");
export type OmitProp = ElementOf<typeof OmitProps>;
type PartialTransferListProps = Omit<TransferListProps, OmitProp>;

export interface TransferListBodyProps extends PartialTransferListProps {
  filteredItems: TransferItem[];
  selectedKeys: string[];
  loading?: boolean;
}

class ListBody extends React.Component<TransferListBodyProps> {
  onItemSelect = (item: TransferItem) => {
    const { onItemSelect, selectedKeys } = this.props;
    const checked = selectedKeys.indexOf(item.key) >= 0;
    onItemSelect(item.key, !checked);
  };

  render() {
    const {
      prefixCls,
      onScroll,
      filteredItems,
      selectedKeys,
      disabled: globalDisabled,
      loading
    } = this.props;

    return (
      <ul className={`${prefixCls}-content`} onScroll={onScroll}>
        {filteredItems.map(item => {
          const { disabled } = item;
          const checked = selectedKeys.indexOf(item.key) >= 0;

          return (
            <ListItem
              disabled={globalDisabled || disabled}
              key={item.key}
              item={item}
              checked={checked}
              prefixCls={prefixCls}
              onClick={this.onItemSelect}
            />
          );
        })}
        {loading && (
          <SkeletonListItem count={filteredItems.length === 0 ? 10 : 2} />
        )}
      </ul>
    );
  }
}

const ListBodyWrapper = (props: TransferListBodyProps) => (
  <ListBody {...props} />
);

export default ListBodyWrapper;
