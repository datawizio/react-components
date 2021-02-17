import React, { useRef, useContext } from "react";

import List from "./List";
import Operation from "./Operation";

import { parseValue, useTransfer } from "./hooks/useTransfer";

import {
  ICheckedItem,
  TransferFilterLoadDataParams,
  TransferFilterProps
} from "./types";

import ConfigContext from "../ConfigProvider/context";

import "./index.less";

const prefixCls = "ant-transfer";

const TransferFilter: React.FC<TransferFilterProps> = ({
  local,
  operationDisabled,
  pagination,
  sourceActions,
  sourceFilters,
  sourceTitle,
  targetTitle,
  targetFilters,
  targetActions,
  type,
  tooltips,
  value,

  onChange,
  loadData,
  loadDataByIds
}) => {
  const { translate } = useContext(ConfigContext);
  const [
    {
      internalValue,
      sourceValue,
      targetValue,
      sourceChecked,
      sourceCheckedObj,
      targetChecked
    },
    dispatch
  ] = useTransfer(value);

  const targetListRef = useRef<any>();
  const sourceListRef = useRef<any>();

  const sourceLoadData = async (params: TransferFilterLoadDataParams) => {
    if (params.exclude) {
      delete params.exclude;
    }
    return await loadData(params, "source");
  };

  const targetLoadData = async (params: TransferFilterLoadDataParams) => {
    params.lastLevel = true;
    return await loadData(params, "target");
  };

  const onLeftItemSelect = (selectedItem: ICheckedItem, checked: boolean) => {
    if (sourceCheckedObj[selectedItem.key]) {
      delete sourceCheckedObj[selectedItem.key];
    }
    const index = sourceChecked.indexOf(selectedItem.key);
    if (index > -1) {
      sourceChecked.splice(index, 1);
    }
    if (checked) {
      sourceCheckedObj[selectedItem.key] = selectedItem;
      sourceChecked.push(selectedItem.key);
    }
    dispatch({
      type: "setState",
      payload: {
        sourceChecked,
        sourceCheckedObj
      }
    });
  };

  const onLeftItemsSelect = (
    selectedItems: ICheckedItem[],
    checked: boolean
  ) => {
    let sourceCheckedNew = null;
    if (checked === false) {
      const set = new Set<string>(selectedItems.map(item => item.key));
      sourceCheckedNew = sourceChecked.filter(item => {
        if (set.has(item)) {
          delete sourceCheckedObj[item];
          return false;
        }
        return true;
      });
    } else {
      selectedItems.forEach(item => {
        if (!sourceCheckedObj[item.key]) {
          sourceCheckedObj[item.key] = item;
          sourceChecked.push(item.key);
        }
      });
    }
    if (selectedItems.length === 0) {
      dispatch({
        type: "setState",
        payload: {
          sourceChecked: [],
          sourceCheckedObj: {}
        }
      });

      return;
    }
    dispatch({
      type: "setState",
      payload: {
        sourceChecked: sourceCheckedNew ? sourceCheckedNew : sourceChecked,
        sourceCheckedObj
      }
    });
  };

  const onRightItemsSelect = (selectedItems: ICheckedItem[]) => {
    const targetChecked = [];
    selectedItems.forEach(item => {
      targetChecked.push(item.key);
    });

    dispatch({
      type: "setState",
      payload: {
        targetChecked
      }
    });
  };

  const moveToRight = () => {
    if (sourceChecked.length === 0) return;

    if (internalValue.include === null) {
      internalValue.include = [...sourceChecked];
    } else if (internalValue.include.length === 0) {
      const set = new Set(sourceChecked);
      internalValue.exclude = internalValue.exclude.filter(
        item => !set.has(item)
      );
    } else {
      internalValue.include = internalValue.include.concat(sourceChecked);
    }

    if (internalValue.include === null)
      internalValue.include = [...sourceChecked];

    onChange(internalValue);
    targetListRef.current.addItems(Object.values(sourceCheckedObj));

    dispatch({
      type: "setState",
      payload: {
        internalValue,
        sourceChecked: [],
        sourceCheckedObj: [],
        ...parseValue(internalValue)
      }
    });
  };

  const moveAllToRight = () => {
    internalValue.include = [];
    internalValue.exclude = [];
    onChange(internalValue);

    dispatch({
      type: "setState",
      payload: {
        sourceChecked: [],
        sourceCheckedObj: [],
        targetChecked: [],
        internalValue,
        ...parseValue(internalValue)
      }
    });
  };

  const moveToLeft = () => {
    if (targetChecked.length === 0) return;
    if (
      Array.isArray(internalValue.include) &&
      internalValue.include.length === 0
    ) {
      internalValue.exclude = internalValue.exclude.concat(targetChecked);
    } else {
      const set = new Set(targetChecked);
      internalValue.include = internalValue.include.filter(
        item => !set.has(item)
      );

      if (internalValue.include.length === 0) internalValue.include = null;
    }

    targetListRef.current.removeItems(Object.values(targetChecked));
    onChange(internalValue);

    dispatch({
      type: "setState",
      payload: {
        targetChecked: [],
        internalValue,
        ...parseValue(internalValue)
      }
    });
  };
  const moveAllToLeft = () => {
    internalValue.include = null;
    internalValue.exclude = [];
    onChange(internalValue);
    dispatch({
      type: "setState",
      payload: {
        sourceChecked: [],
        sourceCheckedObj: [],
        targetChecked: [],
        internalValue,
        ...parseValue(internalValue)
      }
    });
  };

  const onRightItemSelect = (selectedItem: ICheckedItem, checked: boolean) => {
    const index = targetChecked.indexOf(selectedItem.key);
    if (index > -1) {
      targetChecked.splice(index, 1);
    }
    if (checked) {
      targetChecked.push(selectedItem.key);
    }
    dispatch({
      type: "setState",
      payload: {
        targetChecked
      }
    });
  };

  return (
    <div className="dw-transfer-filter">
      <List
        ref={sourceListRef}
        direction="left"
        actions={sourceActions}
        checkedKeys={sourceChecked}
        local={local}
        pagination={pagination}
        prefixCls={`${prefixCls}-list`}
        showSearch={true}
        titleText={sourceTitle}
        type={type}
        value={sourceValue}
        noDataText={translate("NO_DATA")}
        searchText={translate("SEARCH")}
        selectedText={translate("SELECTED")}
        $filters={sourceFilters}
        loadData={sourceLoadData}
        onItemSelect={onLeftItemSelect}
        onItemsSelect={onLeftItemsSelect}
      />
      <Operation
        className={`${prefixCls}-operation`}
        rightActive={true}
        leftActive={true}
        disabled={operationDisabled}
        tooltips={tooltips}
        moveAllToRight={moveAllToRight}
        moveToRight={moveToRight}
        moveAllToLeft={moveAllToLeft}
        moveToLeft={moveToLeft}
      />
      <List
        ref={targetListRef}
        actions={targetActions}
        checkedKeys={targetChecked}
        direction="right"
        disabled={false}
        local={local}
        prefixCls={`${prefixCls}-list`}
        showSearch={true}
        showSelectAll={true}
        titleText={targetTitle}
        type="list"
        value={targetValue}
        $filters={targetFilters}
        noDataText={translate("NO_DATA")}
        searchText={translate("SEARCH")}
        selectedText={translate("SELECTED")}
        pagination={pagination}
        loadData={targetLoadData}
        loadDataByIds={loadDataByIds}
        onItemSelect={onRightItemSelect}
        onItemsSelect={onRightItemsSelect}
      />
    </div>
  );
};

export default TransferFilter;
