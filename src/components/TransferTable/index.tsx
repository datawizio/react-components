import React, { useCallback, useContext, useMemo } from "react";
import { Table as AntTable, Transfer } from "antd";
import { TransferProps } from "antd/es/transfer";
import { TableProps } from "antd/es/table";

import ConfigContext from "../ConfigProvider/context";

export interface TransferTableProps
  extends Omit<TransferProps<any>, "listStyle"> {
  columns: any;
  loading: boolean;
  filteredInfo: any;
  onTableChange: (...params: any) => void;
  transferTableProps?: TableProps<any>;
}

const TransferTable = ({
  columns,
  loading,
  filteredInfo,
  onTableChange,
  transferTableProps,
  ...restProps
}: TransferTableProps) => {
  const { translate } = useContext(ConfigContext);

  const label = useCallback(
    ({ selectedCount, totalCount }) => (
      <>
        {translate("SELECTED")}: {selectedCount} / {totalCount}
      </>
    ),
    [translate]
  );

  const selectAllLabels = useMemo(() => {
    return [label, label];
  }, [label]);

  return (
    <Transfer
      {...restProps}
      className="transfer-table"
      selectAllLabels={selectAllLabels}
      showSelectAll={false}
    >
      {({
        direction,
        filteredItems,
        onItemSelectAll,
        onItemSelect,
        selectedKeys,
        disabled
      }) => (
        <Table
          transferTableProps={transferTableProps}
          direction={direction}
          filter={filteredInfo[direction]}
          loading={loading}
          columns={columns}
          items={filteredItems}
          onItemSelectAll={onItemSelectAll}
          onItemSelect={onItemSelect}
          listSelectedKeys={selectedKeys}
          listDisabled={disabled}
          onTableChange={onTableChange}
        />
      )}
    </Transfer>
  );
};

const Table = ({
  direction,
  filter,
  loading,
  columns,
  items,
  onItemSelectAll,
  onItemSelect,
  listSelectedKeys,
  listDisabled,
  onTableChange,
  transferTableProps
}) => {
  const filteredItems = useMemo(() => {
    const set = new Set(filter);
    return items.filter(item => set.size === 0 || set.has(item.app_name));
  }, [filter, items]);

  const rowSelection = {
    getCheckboxProps: (item: any) => ({
      disabled: listDisabled || item.disabled
    }),
    onSelectAll(selected: any) {
      const treeSelectedKeys = filteredItems.map(({ key }) => key);
      onItemSelectAll(treeSelectedKeys, selected);
    },
    onSelect({ key }, selected) {
      onItemSelect(key, selected);
    },
    selectedRowKeys: listSelectedKeys
  };

  const handleTableChange = (pagination, filter) => {
    onTableChange(direction, pagination, filter);
  };

  const internalColumns = useMemo(() => {
    return [columns[0], { ...columns[1], filteredValue: filter }];
  }, [columns, filter]);

  return (
    <AntTable
      {...transferTableProps}
      rowSelection={rowSelection}
      columns={internalColumns}
      dataSource={filteredItems}
      loading={loading}
      size="small"
      onChange={handleTableChange}
      onRow={({ key }) => ({
        onClick: () => {
          onItemSelect(key, !listSelectedKeys.includes(key));
        }
      })}
    />
  );
};

export default TransferTable;
