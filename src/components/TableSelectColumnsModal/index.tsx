import * as React from "react";

import Tree from "../Tree";
import Modal from "../Modal";
import Button from "../Button";
import { SettingOutlined } from "@ant-design/icons";

import { TableContext } from "../Table/context";
import ConfigContext from "../ConfigProvider/context";

import { deepFilter } from "../../utils/deepFilter";
import { useState, useCallback, useMemo, useContext, useEffect } from "react";

import "./index.less";

export interface TableSelectColumnsModalProps {
  locale?: {
    apply: string;
    checkAll: string;
    openButton: string;
    headerModal: string;
  };
}

const TableSelectColumnsModal: React.FC<TableSelectColumnsModalProps> = props => {
  const { locale } = props;
  const { translate } = useContext(ConfigContext);
  const [tableState, dispatch, , baseTableState] = useContext(TableContext);

  const [isOpened, setIsOpened] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);

  useEffect(() => {
    setCheckedKeys(
      tableState.visibleColumnsKeys ||
        baseTableState.columns.map(column => column.key)
    );
  }, [tableState.visibleColumnsKeys, baseTableState.columns]);

  const treeData = useMemo(() => {
    if (!isOpened) return [];

    const fixedColumnsKeys = tableState.columns
      .filter(column => column.fixed)
      .map(column => column.key);

    return (function rec(columns) {
      return columns.map(column => ({
        key: column.key,
        title: column.title,
        disabled: fixedColumnsKeys.includes(column.key),
        children: column.children && rec(column.children)
      }));
    })(baseTableState.columns);
  }, [isOpened, baseTableState.columns, tableState.columns]);

  const handleApply = useCallback(() => {
    dispatch({ type: "update", payload: { visibleColumnsKeys: checkedKeys } });
    setIsOpened(false);
  }, [checkedKeys, dispatch]);

  const onCheck = useCallback(
    checkedKeys => {
      const parentKeys = [];
      const nextCheckedKeys = checkedKeys || [];

      deepFilter(
        treeData,
        column => checkedKeys.includes(column.key),
        parent => parentKeys.push(parent.key)
      );

      setCheckedKeys(nextCheckedKeys.concat(parentKeys));
    },
    [treeData]
  );

  return (
    <div className="select-columns table-toolbar--right">
      <Button border={false} onClick={() => setIsOpened(true)}>
        <SettingOutlined className="select-columns__icon" />
        {translate(locale.openButton)}
      </Button>

      <Modal
        visible={isOpened}
        title={translate(locale.headerModal)}
        className="select-columns__modal"
        onCancel={() => setIsOpened(false)}
        footer={
          <Button
            type="primary"
            disabled={!checkedKeys.length}
            onClick={handleApply}
          >
            {translate(locale.apply)}
          </Button>
        }
      >
        <Tree
          checkable
          showCheckAll
          onCheck={onCheck}
          treeData={treeData}
          onExpand={setExpandedKeys}
          expandedKeys={expandedKeys}
          checkedKeys={checkedKeys}
          checkAllKey={translate(locale.checkAll)}
        />
      </Modal>
    </div>
  );
};

TableSelectColumnsModal.defaultProps = {
  locale: {
    apply: "APPLY",
    checkAll: "ALL",
    openButton: "COLUMNS",
    headerModal: "SELECT_COLUMNS"
  }
};

export default TableSelectColumnsModal;
