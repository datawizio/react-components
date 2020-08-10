import React, { useState, useRef, useContext } from "react";

import List from "./List";
import Operation from "./Operation";

import { useTransfer } from "./useTransfer";

import { LoadDataParams, LoadDataResponse } from "./types";

import ConfigContext from "../ConfigProvider/context";

import "./index.less";

export interface TransferProps {
  prefixCls?: string;
  className?: string;
  disabled?: boolean;
  targetKeys?: string[];
  selectedKeys?: string[];
  onChange?: (
    targetKeys: string[],
    direction: string,
    moveKeys: string[]
  ) => void;
  onSelectChange?: (
    sourceSelectedKeys: string[],
    targetSelectedKeys: string[]
  ) => void;
  style?: React.CSSProperties;

  sourceTitle?: string;
  sourceLoadData?: (params: LoadDataParams) => Promise<LoadDataResponse>;
  sourceFilters?: any;
  sourceActions?: React.ReactElement;
  targetTitle?: string;
  targetLoadData?: (params: LoadDataParams) => Promise<LoadDataResponse>;
  targetFilters?: any;
  targetActions?: React.ReactElement;

  onMoveToRight?: (keys: string[]) => Promise<void>;
  onMoveAllToRight?: () => Promise<void>;
  onMoveToLeft?: (keys: string[]) => Promise<void>;
  onMoveAllToLeft?: () => Promise<void>;
}

const prefixCls = "ant-transfer";

const Transfer: React.FC<TransferProps> = ({
  sourceTitle,
  sourceLoadData,
  sourceFilters,
  sourceActions,
  targetTitle,
  targetLoadData,
  targetFilters,
  targetActions,

  onMoveToRight,
  onMoveAllToRight,
  onMoveToLeft,
  onMoveAllToLeft
}) => {
  const { translate } = useContext(ConfigContext);
  const [{ sourceChecked, targetChecked }, dispatch] = useTransfer({
    sourceChecked: [],
    targetChecked: []
  });

  const targetListRef = useRef<any>();
  const sourceListRef = useRef<any>();

  const onLeftItemSelect = (selectedKey: string, checked: boolean) => {
    const index = sourceChecked.indexOf(selectedKey);
    if (index > -1) {
      sourceChecked.splice(index, 1);
    }
    if (checked) {
      sourceChecked.push(selectedKey);
    }
    dispatch({
      type: "setState",
      payload: {
        sourceChecked
      }
    });
  };
  const onLeftItemSelectAll = (selectedKeys: string[]) => {
    dispatch({
      type: "setState",
      payload: {
        sourceChecked: selectedKeys
      }
    });
  };
  const handleLeftScroll = () => {};

  const moveToRight = () => {
    sourceListRef.current.addExceptedKeys(sourceChecked);
    targetListRef.current.setState({ dataSource: [], loading: true });
    dispatch({
      type: "setState",
      payload: {
        sourceChecked: []
      }
    });

    onMoveToRight(sourceChecked);
  };

  const moveAllToRight = () => {
    sourceListRef.current.setExceptedKeys(["all"]);
    targetListRef.current.setState({ dataSource: [], loading: true });
    dispatch({
      type: "setState",
      payload: {
        sourceChecked: []
      }
    });

    onMoveAllToRight();
  };

  const moveToLeft = () => {
    targetListRef.current.addExceptedKeys(targetChecked);
    sourceListRef.current.setState({ dataSource: [], loading: true });
    dispatch({
      type: "setState",
      payload: {
        targetChecked: []
      }
    });

    onMoveToLeft(targetChecked);
  };
  const moveAllToLeft = () => {
    targetListRef.current.setExceptedKeys(["all"]);
    sourceListRef.current.setState({ dataSource: [], loading: true });
    dispatch({
      type: "setState",
      payload: {
        targetChecked: []
      }
    });

    onMoveAllToLeft();
  };

  const onRightItemSelect = (selectedKey: string, checked: boolean) => {
    const index = targetChecked.indexOf(selectedKey);
    if (index > -1) {
      targetChecked.splice(index, 1);
    }
    if (checked) {
      targetChecked.push(selectedKey);
    }
    dispatch({
      type: "setState",
      payload: {
        targetChecked
      }
    });
  };
  const onRightItemSelectAll = (selectedKeys: string[]) => {
    dispatch({
      type: "setState",
      payload: {
        targetChecked: selectedKeys
      }
    });
  };
  const handleRightScroll = () => {};

  return (
    <div className="dw-transfer">
      <List
        ref={sourceListRef}
        prefixCls={`${prefixCls}-list`}
        titleText={sourceTitle}
        showSearch={true}
        checkedKeys={sourceChecked}
        loadData={sourceLoadData}
        onItemSelect={onLeftItemSelect}
        onItemSelectAll={onLeftItemSelectAll}
        onScroll={handleLeftScroll}
        direction="left"
        actions={sourceActions}
        $filters={sourceFilters}
        noDataText={translate("NO_DATA")}
        searchText={translate("SEARCH")}
        selectedText={translate("SELECTED")}
      />
      <Operation
        className={`${prefixCls}-operation`}
        rightActive={true}
        moveToRight={moveToRight}
        moveAllToRight={moveAllToRight}
        leftActive={true}
        moveToLeft={moveToLeft}
        moveAllToLeft={moveAllToLeft}
        disabled={false}
      />
      <List
        ref={targetListRef}
        prefixCls={`${prefixCls}-list`}
        titleText={targetTitle}
        checkedKeys={targetChecked}
        loadData={targetLoadData}
        onItemSelect={onRightItemSelect}
        onItemSelectAll={onRightItemSelectAll}
        showSearch={true}
        onScroll={handleRightScroll}
        disabled={false}
        direction="right"
        showSelectAll={true}
        actions={targetActions}
        $filters={targetFilters}
        noDataText={translate("NO_DATA")}
        searchText={translate("SEARCH")}
        selectedText={translate("SELECTED")}
      />
    </div>
  );
};

export default Transfer;
