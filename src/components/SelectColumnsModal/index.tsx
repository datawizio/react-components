import * as React from "react";

import Tree from "../Tree";
import Modal from "../Modal";
import Button from "../Button";
import { IColumn } from "../Table/types";
import { SettingOutlined } from "@ant-design/icons";

import { useState, useCallback, useMemo } from "react";

import "./index.less";

export interface SelectTableColumnsModalProps {
  columns: Array<IColumn>;
  visibleColumnsKeys: Array<IColumn["key"]>;
  onSelectColumns?: (selectedColumnsKeys: Array<IColumn["key"]>) => void;

  locale?: {
    apply: string;
    checkAll: string;
    openButton: string;
    headerModal: string;
  };
}

const SelectTableColumnsModal: React.FC<SelectTableColumnsModalProps> = props => {
  const { visibleColumnsKeys, onSelectColumns, locale } = props;

  const [isOpened, setIsOpened] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState(visibleColumnsKeys);

  const columns = useMemo(() => {
    return props.columns.filter(column => !column.fixed);
  }, [props.columns]);

  const openModal = useCallback(() => {
    setIsOpened(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpened(false);
  }, []);

  const handleApply = useCallback(() => {
    if (onSelectColumns) {
      const fixedColumnsKeys = props.columns
        .filter(column => column.fixed)
        .map(column => column.key);

      onSelectColumns(checkedKeys.concat(fixedColumnsKeys));
    }
    closeModal();
  }, [closeModal, checkedKeys, onSelectColumns, props.columns]);

  const onCheck = useCallback(checkedKeys => {
    setCheckedKeys(checkedKeys || []);
  }, []);

  return (
    <div className="select-columns">
      <Button border={false} onClick={openModal}>
        <SettingOutlined />
        {locale.openButton}
      </Button>

      <Modal
        destroyOnClose
        visible={isOpened}
        onCancel={closeModal}
        title={locale.headerModal}
        className="select-columns__modal"
        footer={
          <Button
            type="primary"
            disabled={!checkedKeys.length}
            onClick={handleApply}
          >
            {locale.apply}
          </Button>
        }
      >
        <Tree
          checkable
          showCheckAll
          onCheck={onCheck}
          treeData={columns as any}
          onExpand={setExpandedKeys}
          expandedKeys={expandedKeys}
          checkAllKey={locale.checkAll}
          defaultCheckedKeys={visibleColumnsKeys}
        />
      </Modal>
    </div>
  );
};

SelectTableColumnsModal.defaultProps = {
  locale: {
    apply: "Apply",
    checkAll: "Check All",
    openButton: "Columns",
    headerModal: "Select columns"
  }
};

export default SelectTableColumnsModal;
