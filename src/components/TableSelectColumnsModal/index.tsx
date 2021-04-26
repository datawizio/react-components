import * as React from "react";
import Modal from "../Modal";
import Button from "../Button";
import { SettingOutlined } from "@ant-design/icons";
import { TableContext } from "../Table/context";
import ConfigContext from "../ConfigProvider/context";
import { useState, useCallback, useMemo, useContext, useEffect } from "react";
import TreeSearch from "../TreeSearch";
import "./index.less";

export interface TableSelectColumnsModalProps {
  locale?: {
    apply: string;
    checkAll: string;
    openButton: string;
    headerModal: string;
  };
  sendActivity?: () => void;
  withSearch?: boolean;
}

const TableSelectColumnsModal: React.FC<TableSelectColumnsModalProps> = props => {
  const { locale, withSearch, sendActivity } = props;
  const { translate } = useContext(ConfigContext);
  const { tableState, dispatch, baseTableState } = useContext(TableContext);

  const [isOpened, setIsOpened] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getColKeysRec = useCallback(columns => {
    let keys = [];
    columns.forEach(col => {
      col && keys.push(col.key);
      if (col.children && col.children.length) {
        keys = keys.concat(getColKeysRec(col.children));
      }
    });
    return keys;
  }, []);

  const treeData = useMemo(() => {
    if (!isOpened) return [];

    const fixedColumnsKeys = tableState.columns
      .filter(column => column.fixed)
      .map(column => column.key);

    return (function rec(columns, parent) {
      return columns.map(column => ({
        key: column.key,
        parentKey: parent && parent.key,
        title: column.title,
        disabled: fixedColumnsKeys.includes(column.key),
        children: column.children && rec(column.children, column)
      }));
    })(baseTableState.columns);
  }, [isOpened, baseTableState.columns, tableState.columns]);

  const handleApply = useCallback(() => {
    sendActivity();
    dispatch({ type: "update", payload: { visibleColumnsKeys: checkedKeys } });
    setIsOpened(false);
    setSearchValue("");
  }, [checkedKeys, dispatch]);

  const handleCancel = useCallback(() => {
    setIsOpened(false);
    setSearchValue("");
  }, []);

  const onCheck = useCallback(checkedKeys => {
    setCheckedKeys(checkedKeys || []);
  }, []);

  useEffect(() => {
    setCheckedKeys(
      tableState.visibleColumnsKeys && tableState.visibleColumnsKeys.length
        ? tableState.visibleColumnsKeys
        : getColKeysRec(baseTableState.columns)
    );
  }, [tableState.visibleColumnsKeys, baseTableState.columns, getColKeysRec]);

  return (
    <div className="select-columns table-toolbar--right">
      <Button
        border={false}
        onClick={() => setIsOpened(true)}
        title={translate("COLUMNS_BTN_TITLE")}
      >
        <SettingOutlined className="select-columns__icon" />
        {translate(locale.openButton)}
      </Button>

      <Modal
        visible={isOpened}
        title={translate(locale.headerModal)}
        className="select-columns__modal"
        destroyOnClose={true}
        onCancel={handleCancel}
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
        <TreeSearch
          checkable
          showCheckAll
          showSearchInput={withSearch}
          onCheck={onCheck}
          treeData={treeData}
          checkedKeys={checkedKeys}
          onExpand={setExpandedKeys}
          expandedKeys={expandedKeys}
          checkAllTitle={translate(locale.checkAll)}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </Modal>
    </div>
  );
};

TableSelectColumnsModal.defaultProps = {
  locale: {
    apply: "SUBMIT",
    checkAll: "ALL",
    openButton: "COLUMNS",
    headerModal: "SELECT_COLUMNS",
  },
  withSearch: true
};

export default TableSelectColumnsModal;
