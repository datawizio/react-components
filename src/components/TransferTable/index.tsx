import React, { useCallback, useContext, useMemo } from "react";
import { Table, Transfer } from "antd";
import { TransferProps } from "antd/es/transfer";
import difference from "lodash/difference";
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
        selectedKeys: listSelectedKeys,
        disabled: listDisabled
      }) => {
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
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredItems}
            loading={loading}
            size="small"
            onRow={({ key }) => ({
              onClick: () => {
                onItemSelect(key, !listSelectedKeys.includes(key));
              }
            })}
          />
        );
      }}
    </Transfer>
  );
};

export default TransferTable;
