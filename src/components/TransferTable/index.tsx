import React, { useCallback, useContext, useMemo, useState } from "react";
import { Table as AntTable, Transfer } from "antd";
import { TransferProps } from "antd/es/transfer";
import ConfigContext from "../ConfigProvider/context";

export interface TransferTableProps extends TransferProps {
  columns: any;
}

const TransferTable = ({ columns, loading, ...restProps }) => {
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
        filteredItems,
        onItemSelectAll,
        onItemSelect,
        selectedKeys,
        disabled
      }) => (
        <Table
          loading={loading}
          columns={columns}
          items={filteredItems}
          onItemSelectAll={onItemSelectAll}
          onItemSelect={onItemSelect}
          listSelectedKeys={selectedKeys}
          listDisabled={disabled}
        />
      )}
    </Transfer>
  );
};

const Table = ({
  loading,
  columns,
  items,
  onItemSelectAll,
  onItemSelect,
  listSelectedKeys,
  listDisabled
}) => {
  const [filter, setFilter] = useState<Array<string>>([]);
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

  return (
    <AntTable
      rowSelection={rowSelection}
      columns={columns}
      dataSource={filteredItems}
      loading={loading}
      size="small"
      onChange={(pagination, filter) => {
        //@ts-ignore
        setFilter(filter.app_name);
      }}
      onRow={({ key }) => ({
        onClick: () => {
          onItemSelect(key, !listSelectedKeys.includes(key));
        }
      })}
    />
  );
};

export default TransferTable;
