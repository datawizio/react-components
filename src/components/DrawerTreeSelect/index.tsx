import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect
} from "react";
import clsx from "clsx";

import { Skeleton } from "antd";
import SearchInput from "../SearchInput";
import Drawer from "../Drawer";
import Button from "../Button";
import { Levels } from "./Levels";
import AntTreeSelect from "./antd/AntTreeSelect";

import { triggerInputChangeValue } from "../../utils/trigger";

import {
  IDrawerTreeSelectFilters,
  FCDrawerTreeSelect,
  LevelsType
} from "./types";
import { SelectValue } from "antd/lib/tree-select";
import { DataNode, Key } from "rc-tree-select/es/interface";
import { AntTreeNode } from "antd/lib/tree";

import "./index.less";

function getMainLevelItems(items: any[], level: number = 1) {
  const res = [];
  for (let item of items) {
    if (item.level === level) {
      res.push(item.id);
    } else {
      break;
    }
  }

  return res;
}

const DrawerTreeSelect: FCDrawerTreeSelect<SelectValue> = ({
  asyncData,
  showCheckAll,
  showLevels,
  levels,
  level,
  checkAllTitle,
  checkAllKey,
  drawerTitle,
  drawerSearchPlaceholder,
  drawerWidth,
  formatRender,
  treeDefaultExpandedKeys,
  treeExpandedKeys,
  treeData,
  cancelText,
  submitText,
  loadingText,
  noDataText,
  levelText,
  value,
  isFlatList,
  onChange,
  onLevelChange,
  loadData,
  loadChildren,
  multiple,
  remoteSearch,
  loading,
  showSelectAll,
  selectAllText,
  ...restProps
}) => {
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [, setSearchValue] = useState<string>("");
  const [internalValue, setInternalValue] = useState<SelectValue>(value);
  const [selected, setSelected] = useState<AntTreeNode>();
  const [stateTreeData, setStateTreeData] = useState(treeData);
  const [internalLoading, setInternalLoading] = useState<boolean>(loading);
  const [internalLevels, setInternalLevels] = useState<LevelsType>(levels);

  const formatSelected = useRef<string[]>();
  const searchValue = useRef<string>();
  const levelSelected = useRef<number>(level);

  const [internalTreeExpandedKeys, setInternalTreeExpandedKeys] = useState<
    Key[]
  >([]);
  const inputRef = useRef<HTMLInputElement>();

  const internalTreeDefaultExpandedKeys = useMemo(() => {
    if (searchValue.current && !remoteSearch) return undefined;
    if (internalTreeExpandedKeys.length > 0) return internalTreeExpandedKeys;
    if (showCheckAll) treeDefaultExpandedKeys.concat([checkAllKey]);

    return undefined;
  }, [
    treeDefaultExpandedKeys,
    checkAllKey,
    remoteSearch,
    showCheckAll,
    searchValue,
    internalTreeExpandedKeys
  ]);

  const internalTreeData: DataNode[] = useMemo(() => {
    return showCheckAll
      ? [
          {
            key: checkAllKey,
            title: checkAllTitle,
            value: checkAllKey,
            children: stateTreeData,
            className: "tree-check-all"
          }
        ]
      : stateTreeData;
  }, [stateTreeData, checkAllKey, checkAllTitle, showCheckAll]);

  const isLevelShowed =
    showLevels && internalLevels && internalLevels.length > 1;

  // ----- METHODS -------

  const setInputRef = (el: HTMLInputElement) => {
    if (el.classList.contains("ant-select-selection-search-input")) {
      inputRef.current = el;
    }
  };

  const triggerOnChange = useCallback(
    value => {
      if (!onChange) return;
      if (!multiple) {
        if (value[0]) return onChange(value[0], selected);
        return onChange("");
      }
      onChange(value);
    },
    [multiple, selected, onChange]
  );

  const internalLoadData = useCallback(async () => {
    const filters: IDrawerTreeSelectFilters = { search: searchValue.current };

    if (showLevels) {
      filters.level = levelSelected.current;
    }

    if (formatRender) {
      filters.formats = formatSelected.current;
    }
    setStateTreeData([]);
    setInternalLoading(true);
    triggerInputChangeValue(inputRef.current);

    const { data, levels, expanded } = await loadData(filters);

    setStateTreeData(data);
    setInternalLoading(false);

    if (showLevels && levels) {
      setInternalLevels(levels);
    }
    if (expanded) {
      setInternalTreeExpandedKeys(expanded);
    }

    triggerInputChangeValue(
      inputRef.current,
      remoteSearch ? undefined : searchValue.current
    );
  }, [loadData, showLevels, formatRender, remoteSearch]);

  //  -------- HANDLERS --------
  const closeDrawer = useCallback(() => {
    setTimeout(() => {
      const activeElement = document.activeElement as HTMLElement;
      activeElement.blur();
    }, 100);

    searchValue.current = "";
    setDrawerVisible(false);

    // setSearchValue("");
    setInternalTreeExpandedKeys([]);
  }, []);

  const handlerDrawerCancel = useCallback(() => {
    closeDrawer();
    setInternalValue(!multiple && !value ? [] : value);
  }, [closeDrawer, value, multiple]);

  const handlerDrawerSubmit = useCallback(() => {
    closeDrawer();
    triggerOnChange(internalValue);
  }, [triggerOnChange, closeDrawer, internalValue]);

  const handlerDrawerFocus = e => {
    setInputRef(e.target);
    setDrawerVisible(true);
    triggerInputChangeValue(inputRef.current, searchValue.current);
  };

  const handlerSearchInputChange = useCallback(
    e => {
      const inputValue = e.target.value;

      searchValue.current = inputValue;
      setSearchValue(inputValue);

      if (remoteSearch) {
        internalLoadData();
        return;
      }
      triggerInputChangeValue(inputRef.current, inputValue);
    },
    //eslint-disable-next-line
    [inputRef]
  );

  const handlerSelectBeforeBlur = useCallback(() => !drawerVisible, [
    drawerVisible
  ]);

  const handleTreeSelect = useCallback(
    (_, node) => {
      setSelected(node);
    },
    [setSelected]
  );

  const handleTreeSelectChange = useCallback(
    (value, labels, extra) => {
      if (multiple) {
        setInternalValue(value);
      } else {
        setInternalValue(extra.checked ? [extra.triggerValue] : []);
      }
      if (!drawerVisible) {
        triggerOnChange(value);
      }
    },
    [drawerVisible, triggerOnChange, multiple]
  );

  const handlerTreeExpand = useCallback(expandedKeys => {
    setInternalTreeExpandedKeys(expandedKeys);
  }, []);

  const handleLevelChange = (level: number) => {
    levelSelected.current = level;
    onLevelChange && onLevelChange(level);
    internalLoadData();
  };

  const handleTreeLoadData = async node => {
    const data = await loadChildren(node.id);
    setStateTreeData(internalTreeData.concat(data));
    triggerInputChangeValue(inputRef.current, searchValue.current);
  };

  const handleSelectAllClick = () => {
    const items = getMainLevelItems(internalTreeData, levelSelected.current);
    setInternalValue(items);
  };

  // ---- EFFECTS ------

  useEffect(() => {
    setInternalValue(!multiple && !value ? [] : value);
  }, [value, multiple]);

  useEffect(() => {
    setStateTreeData(treeData);
  }, [treeData]);

  useEffect(() => {
    setInternalLoading(loading);
  }, [loading]);

  useEffect(() => {
    !asyncData && loadData && internalLoadData();
    //eslint-disable-next-line
  }, [asyncData]);

  // -------- RENDERS ---------

  const format = useMemo(() => {
    if (!formatRender) return null;
    return formatRender({
      onChange: (selected: string[]) => {
        formatSelected.current = selected;
        internalLoadData();
      }
    });
  }, [formatRender, internalLoadData]);

  const dropdownRender = useCallback(
    menu => {
      return (
        <Drawer
          className={clsx({
            "drawer-tree-select-dropdown": true,
            "drawer-tree-select-dropdown-show-all": showCheckAll,
            "drawer-tree-select-dropdown-flat-list": isFlatList
          })}
          title={drawerTitle ? drawerTitle : restProps.placeholder}
          onClose={handlerDrawerCancel}
          visible={drawerVisible}
          width={drawerWidth}
          actions={
            <>
              <Button onClick={handlerDrawerCancel}>{cancelText}</Button>
              <Button onClick={handlerDrawerSubmit} type="primary">
                {submitText}
              </Button>
            </>
          }
        >
          {format}
          {isLevelShowed ? (
            <Levels
              onChange={handleLevelChange}
              value={levelSelected.current}
              levels={internalLevels}
            />
          ) : null}
          <SearchInput
            placeholder={drawerSearchPlaceholder}
            value={searchValue.current}
            onChange={handlerSearchInputChange}
            loading={internalLoading}
          />
          <div className="drawer-tree-select-dropdown-toolbar">
            {showSelectAll ? (
              <Button border={false} type="link" onClick={handleSelectAllClick}>
                {selectAllText}
              </Button>
            ) : null}
          </div>
          {menu}
          <div className="drawer-select-loader-container">
            {internalLoading && (
              <Skeleton
                title={{ width: 300 }}
                paragraph={{ rows: 1 }}
                loading={true}
                active
              />
            )}
          </div>
        </Drawer>
      );
    },
    //eslint-disable-next-line
    [
      drawerVisible,
      searchValue,
      internalLoading,
      internalLevels,
      levelSelected.current,
      handlerDrawerCancel,
      handlerDrawerSubmit,
      handlerSearchInputChange
    ]
  );

  const listHeight =
    window.innerHeight -
    204 -
    (formatRender === null ? 0 : 44) -
    (isLevelShowed ? 44 : 0) -
    (showSelectAll ? 32 : 0);

  return (
    <AntTreeSelect
      {...restProps}
      value={internalValue}
      className="drawer-tree-select"
      treeData={internalTreeData}
      open={drawerVisible}
      treeExpandedKeys={internalTreeDefaultExpandedKeys}
      searchValue={
        searchValue.current && !remoteSearch ? searchValue.current : ""
      }
      //@ts-ignore
      dropdownRender={dropdownRender}
      dropdownClassName="drawer-tree-select-dropdown-fake"
      multiple={multiple}
      showSearch={true}
      listHeight={listHeight}
      loading={internalLoading}
      notFoundContent={internalLoading ? loadingText : noDataText}
      loadData={loadChildren ? handleTreeLoadData : null}
      onBeforeBlur={handlerSelectBeforeBlur}
      onChange={handleTreeSelectChange}
      onFocus={handlerDrawerFocus}
      onTreeExpand={handlerTreeExpand}
      onSelect={handleTreeSelect}
    />
  );
};

DrawerTreeSelect.defaultProps = {
  maxTagCount: 10,
  treeDefaultExpandedKeys: [],
  showCheckAll: false,
  showLevels: false,
  isFlatList: false,
  checkAllTitle: "Check all",
  checkAllKey: "-1",
  drawerTitle: "",
  drawerSearchPlaceholder: "Search",
  drawerWidth: 400,
  cancelText: "Cancel",
  submitText: "Submit",
  loadingText: "Loading",
  noDataText: "No data",
  levelText: "Level %s",
  formatRender: null,
  remoteSearch: false,
  showSelectAll: false,
  selectAllText: "Select all",
  levels: []
};

DrawerTreeSelect.SHOW_ALL = AntTreeSelect.SHOW_ALL;
DrawerTreeSelect.SHOW_CHILD = AntTreeSelect.SHOW_CHILD;
DrawerTreeSelect.SHOW_PARENT = AntTreeSelect.SHOW_PARENT;

export default DrawerTreeSelect;
