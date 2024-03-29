import * as React from "react";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import clsx from "clsx";
import Modal from "../Modal";
import Button from "../Button";
import { ProfileOutlined } from "@ant-design/icons";
import TreeSearch from "../TreeSearch";
import { TableContext } from "../Table/context";
import ConfigContext from "../ConfigProvider/context";
import { TableSelectColumnsModalProps } from ".";
import { isSafari } from "../../utils/navigatorInfo";
import "./index.less";

export interface TableSelectColumnsModalModalProps
  extends TableSelectColumnsModalProps {
  treeData: any;
  context?: any;
  titleRender?: any;
}

const getColKeysRec = columns => {
  let keys = [];
  columns.forEach(col => {
    col && keys.push(col.key);
    if (col.children && col.children.length) {
      keys = keys.concat(getColKeysRec(col.children));
    }
  });
  return keys;
};

export const TableSelectColumnsModalModal: React.FC<
  TableSelectColumnsModalModalProps
> = props => {
  let {
    showSelectedCount,
    locale,
    withSearch,
    treeData,
    onSubmit,
    maxCheckedKeys,
    filterSelectedColumns,
    additionalVisibleColumns,
    hiddenColumns,
    titleRender
  } = props;
  const { translate } = useContext(ConfigContext);
  const { tableState, dispatch, baseTableState } = useContext(TableContext);

  const columnsCount = useMemo(() => {
    let count = 0;

    function dig(items) {
      items.forEach(item => {
        if (
          item.children &&
          Array.isArray(item.children) &&
          item.children.length > 0
        ) {
          dig(item.children);
        } else {
          count++;
        }
      });
    }

    dig(treeData);

    return count;
  }, [treeData]);

  if (columnsCount < maxCheckedKeys) maxCheckedKeys = columnsCount;

  const [isOpened, setIsOpened] = useState(false);
  const [isInitialPreset, setIsInitialPreset] = useState(true);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [initialCheckedKeys, setInitialCheckedKeys] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const containerRef = useRef(null);

  const visibleColumnsKeys = useMemo(() => {
    const metricColumns = filterSelectedColumns
      ? filterSelectedColumns(checkedKeys)
      : checkedKeys;

    let columns = additionalVisibleColumns
      ? metricColumns.concat(additionalVisibleColumns)
      : metricColumns;

    if (hiddenColumns && hiddenColumns.length) {
      columns = columns.filter(col => !hiddenColumns.includes(col));
    }

    return columns;
  }, [
    filterSelectedColumns,
    checkedKeys,
    additionalVisibleColumns,
    hiddenColumns
  ]);

  const visibleColumnsKeysLength = useMemo(() => {
    let count = visibleColumnsKeys.length;
    const additionalColumnsLength =
      additionalVisibleColumns && additionalVisibleColumns.length;
    if (additionalColumnsLength) {
      count = count - additionalColumnsLength;
    }
    return count;
  }, [additionalVisibleColumns, visibleColumnsKeys.length]);

  const modalClassNames = useMemo(() => {
    return clsx("select-columns__modal", {
      "select-columns__modal-with-counter": showSelectedCount,
      "select-columns__modal-safari": isSafari()
    });
  }, [showSelectedCount]);

  const selectedInfoClassNames = useMemo(() => {
    return clsx("select-columns__modal-selected", {
      "select-columns__modal-selected-warning":
        visibleColumnsKeysLength > maxCheckedKeys
    });
  }, [maxCheckedKeys, visibleColumnsKeysLength]);

  const unhighlightButton = useCallback(() => {
    setTimeout(() => {
      containerRef.current?.childNodes[0].blur();
    }, 1000);
  }, [containerRef]);

  const handleApply = useCallback(() => {
    onSubmit && onSubmit(visibleColumnsKeys);

    const payload: any = { visibleColumnsKeys, templateSelected: false };
    if (
      (typeof props.fetchAfterApply === "boolean" && props.fetchAfterApply) ||
      (typeof props.fetchAfterApply === "function" &&
        props.fetchAfterApply(visibleColumnsKeys, tableState.dataSource[0]))
    ) {
      payload.forceFetch = tableState.forceFetch + 1;
    }

    dispatch({ type: "update", payload });
    setIsOpened(false);
    setCheckedKeys(checkedKeys);
    setIsInitialPreset(true);
    setSearchValue("");
    unhighlightButton();
  }, [
    onSubmit,
    visibleColumnsKeys,
    props,
    tableState.dataSource,
    tableState.forceFetch,
    dispatch,
    checkedKeys,
    unhighlightButton
  ]);

  const handleCancel = useCallback(() => {
    setIsOpened(false);
    setSearchValue("");
    if (initialCheckedKeys.length > 0) {
      setCheckedKeys(initialCheckedKeys);
    }
    unhighlightButton();
  }, [initialCheckedKeys, unhighlightButton]);

  const onCheck = useCallback(checkedKeys => {
    setCheckedKeys(checkedKeys || []);
  }, []);

  useEffect(() => {
    const checkedKeysList =
      tableState.visibleColumnsKeys && tableState.visibleColumnsKeys.length
        ? tableState.visibleColumnsKeys
        : getColKeysRec(baseTableState.columns);
    setCheckedKeys(checkedKeysList);

    // if (isInitialPreset) {
    setInitialCheckedKeys(checkedKeysList);
    setIsInitialPreset(false);
    // }
  }, [tableState.visibleColumnsKeys, baseTableState.columns]);

  return (
    <div className="select-columns table-toolbar--right" ref={containerRef}>
      <Button
        border={false}
        onClick={() => setIsOpened(true)}
        title={translate("COLUMNS_BTN_TITLE")}
      >
        <ProfileOutlined className="select-columns__icon" />
        {translate(locale.openButton)}
      </Button>
      <Modal
        visible={isOpened}
        title={translate(locale.headerModal)}
        className={modalClassNames}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={
          <Button
            type="primary"
            disabled={
              !visibleColumnsKeysLength ||
              visibleColumnsKeysLength > maxCheckedKeys
            }
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
          maxCheckedKeys={maxCheckedKeys}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          titleRender={titleRender}
        />
        {showSelectedCount && (
          <div className={selectedInfoClassNames}>
            <div className="select-columns__modal-selected-inner">
              {translate("SELECTED")}: {visibleColumnsKeysLength} /{" "}
              {maxCheckedKeys}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

TableSelectColumnsModalModal.defaultProps = {
  locale: {
    apply: "SUBMIT",
    checkAll: "ALL",
    openButton: "COLUMNS",
    headerModal: "SELECT_COLUMNS"
  },
  withSearch: true,
  maxCheckedKeys: 100
};
