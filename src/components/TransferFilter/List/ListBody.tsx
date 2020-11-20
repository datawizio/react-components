import * as React from "react";
import { ElementOf, Omit, tuple } from "antd/es/_util/type";
import { ICheckedItem, TransferFilterItem } from "../types";
import { TransferListProps } from "./index";
import ListItem from "./ListItem";
import { SkeletonListItem } from "./Skeleton";
import { Pagination } from "antd";
import { PaginationType } from "antd/es/transfer/interface";
import { ListTree } from "./ListTree";
import { isLocalDataSource } from "../helper";

export const OmitProps = tuple("checkedKeys", "type");
export type OmitProp = ElementOf<typeof OmitProps>;
type PartialTransferListProps = Omit<TransferListProps, OmitProp>;

export interface TransferListBodyProps extends PartialTransferListProps {
  filteredItems: TransferFilterItem[];
  ref: any;
  totalItemsCount: number;
  selectedKeys: string[];
  loading?: boolean;
  type?: "tree" | "list";
  pagination?: PaginationType;
  loadTreeData?: any;
  expandedKeys?: string[];
  disabledKeys?: string[];
  enabledKeys?: string[];
  disableAll?: boolean;
  onPageChange?: (page: number) => void;
}

interface TransferListBodyState {
  current: number;
}

function parsePagination(pagination?: PaginationType) {
  if (!pagination) {
    return null;
  }

  const defaultPagination = {
    pageSize: 100
  };

  if (typeof pagination === "object") {
    return {
      ...defaultPagination,
      ...pagination
    };
  }

  return defaultPagination;
}

class ListBody extends React.Component<
  TransferListBodyProps,
  TransferListBodyState
> {
  state = {
    current: 1
  };
  onItemSelect = (item: TransferFilterItem) => {
    const { onItemSelect, selectedKeys } = this.props;
    const checked = selectedKeys.indexOf(item.key) >= 0;
    onItemSelect({ key: item.key, title: item.title }, !checked);
  };

  onItemsSelect = (items: ICheckedItem[]) => {
    this.props.onItemsSelect(items);
  };

  resetPage = () => {
    this.setState({ current: 1 });
  };

  onPageChange = (current: number) => {
    this.setState({ current });
    this.props.onPageChange(current);
  };

  getItems = () => {
    const { filteredItems, direction, value, local } = this.props;
    const { current } = this.state;

    if (isLocalDataSource(value.include, direction, local)) {
      return filteredItems.slice((current - 1) * 100, current * 100);
    }
    return filteredItems;
  };

  render() {
    const { current } = this.state;
    const {
      prefixCls,
      filteredItems,
      expandedKeys,
      selectedKeys,
      disabled: globalDisabled,
      loading,
      disabledKeys,
      disableAll,
      enabledKeys,
      type,
      pagination,
      loadTreeData,
      totalItemsCount
    } = this.props;
    let paginationNode: React.ReactNode = null;

    const enabledSet = new Set(enabledKeys);
    const disabledSet = new Set(disabledKeys);
    const mergedPagination = parsePagination(pagination);
    const displayItems = this.getItems();

    if (type !== "tree" && mergedPagination) {
      paginationNode = (
        <Pagination
          simple
          size="small"
          disabled={globalDisabled}
          className={`${prefixCls}-pagination`}
          total={totalItemsCount}
          pageSize={mergedPagination.pageSize}
          current={current}
          onChange={this.onPageChange}
        />
      );
    }

    return (
      <>
        <ul className={`${prefixCls}-content`}>
          {type === "tree" ? (
            <ListTree
              selectedKeys={selectedKeys}
              disabledKeys={disabledKeys}
              disableAll={disableAll}
              enabledKeys={enabledKeys}
              filteredItems={filteredItems}
              loadData={loadTreeData}
              expandedKeys={expandedKeys}
              onItemSelect={this.onItemSelect}
              onItemsSelect={this.onItemsSelect}
            />
          ) : (
            displayItems.map(item => {
              item.key = item.key ?? item.id;

              const disabled = disableAll
                ? !enabledSet.has(item.key)
                : disabledSet.has(item.key);

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
            })
          )}
          {loading && (
            <SkeletonListItem count={filteredItems.length === 0 ? 10 : 2} />
          )}
        </ul>
        {paginationNode}
      </>
    );
  }
}

const ListBodyWrapper = (props: TransferListBodyProps) => (
  <ListBody ref={props.ref} {...props} />
);

export default ListBodyWrapper;
