import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect
} from "react";
import clsx from "clsx";

import { Skeleton, Tag } from "antd";
import SearchInput from "../SearchInput";
import Drawer from "../Drawer";
import Button from "../Button";
import { Levels } from "./Levels";
import AntTreeSelect from "./antd/AntTreeSelect";
import Checkbox from "../Checkbox";

import { triggerInputChangeValue } from "../../utils/trigger";

import { IDrawerTreeSelectFilters, FCDrawerTreeSelect } from "./types";
import { SelectValue } from "antd/lib/tree-select";
import { DataNode } from "rc-tree-select/es/interface";

import "./index.less";
import { useDrawerTreeSelect } from "./useDrawerTreeSelect";

function getMainLevelItems(items: any[], level: string | number | null = 1) {
  const set = new Set<string>();

  for (let item of items) {
    if ((level === null && item.pId === null) || item.level === level) {
      set.add(item.id);
    } else {
      break;
    }
  }

  return set;
}

function isAllItemsChecked(items: string[], set: Set<string>) {
  if (items.length !== set.size) return false;

  for (const value of items) {
    if (!set.has(value)) {
      return false;
    }
  }

  return true;
}
function calcEmptyIsAll(
  emptyIsAll: boolean,
  filters: IDrawerTreeSelectFilters
) {
  if (!emptyIsAll) return false;
  if (filters.search) return false;
  if (filters.level.toString() !== "1") return false;
  if (filters.formats && filters.formats.length !== 0) return false;
  return true;
}

const DrawerTreeSelect: FCDrawerTreeSelect<SelectValue> = ({
  additionalFilters,
  asyncData,
  showLevels,
  levels,
  level,
  drawerTitle,
  drawerSearchPlaceholder,
  drawerWidth,
  formatRender,
  treeDefaultExpandedKeys,
  treeExpandedKeys,
  treeData,
  treeDataCount,
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
  showCheckedStrategy,
  multiple,
  remoteSearch,
  loading,
  showSelectAll,
  selectAllText,
  emptyIsAll,
  placeholder,
  ...restProps
}) => {
  const [
    {
      drawerVisible,
      internalValue,
      selected,
      stateTreeData,
      internalLoading,
      internalLevels,
      selectAllState,
      internalTreeDataCount,
      internalTreeExpandedKeys
    },
    dispatch
  ] = useDrawerTreeSelect({
    drawerVisible: false,
    internalValue: value,
    selected: undefined,
    stateTreeData: treeData,
    internalLoading: loading,
    internalLevels: levels,
    selectAllState: "",
    internalTreeDataCount: 0,
    internalTreeExpandedKeys: []
  });

  const [, setSearchValue] = useState<string>("");
  const mainLevelItems = useRef<Set<string>>();

  const formatSelected = useRef<string[]>([]);
  const searchValue = useRef<string>();
  const levelSelected = useRef<string | number | null>(
    showLevels ? level : null
  );

  const prevTreeData = useRef<DataNode[]>();
  const prevLevel = useRef<string | number>();
  const prevFormatSelected = useRef<string[]>();
  const prevEmptyIsAllRef = useRef<boolean>();

  const drawerVisibleRef = useRef<boolean>(false);

  const emptyIsAllRef = useRef<boolean>(emptyIsAll);

  const inputRef = useRef<HTMLInputElement>();

  const showAllRef = useRef<boolean>(false);

  const internalTreeDefaultExpandedKeys = useMemo(() => {
    if (searchValue.current && !remoteSearch) return undefined;
    if (internalTreeExpandedKeys.length > 0) return internalTreeExpandedKeys;

    return treeDefaultExpandedKeys;
  }, [
    treeDefaultExpandedKeys,
    remoteSearch,
    searchValue,
    internalTreeExpandedKeys
  ]);

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
      if (isSelectedAll) {
        dispatch({ type: "resetIntervalValue" });
        return onChange([]);
      }
      onChange(value);
    },
    //eslint-disable-next-line
    [multiple, selected, onChange, selectAllState, emptyIsAll]
  );

  const getAllFilters = (first: boolean, newValue?: string[]) => {
    const filters: IDrawerTreeSelectFilters = {
      search: searchValue.current,
      ...additionalFilters
    };

    if (showLevels) {
      filters.level = levelSelected.current;
    }

    if (formatRender) {
      filters.formats = formatSelected.current;
    }

    if (first) {
      filters.value = value;
    } else {
      filters.value = newValue ? newValue : internalValue;
    }

    return filters;
  };

  const internalLoadData = useCallback(
    async (first: boolean = false, value?: string[]) => {
      const filters = getAllFilters(first, value);

      emptyIsAllRef.current = calcEmptyIsAll(emptyIsAll, filters);

      triggerInputChangeValue(inputRef.current);
      dispatch({
        type: "remoteLoadDataStart",
        payload: value
      });

      const { data, levels, expanded, count } = await loadData(filters);

      mainLevelItems.current = getMainLevelItems(data, levelSelected.current);

      const newState: any = {
        stateTreeData: data
      };

      if (first) {
        prevTreeData.current = data;
      }

      if (count) {
        newState.intenalTreeDataCount = count;
      }

      if (showLevels && levels) {
        newState.internalLevels = levels;
      }

      if (expanded) {
        newState.internalTreeExpandedKeys = expanded;
      }

      if (drawerVisibleRef.current) {
        const s = checkSelectAllStatus(
          value ? value : internalValue,
          !emptyIsAllRef.current
        );

        newState.selectAllState = s.selectAllState;
        newState.internalValue = s.internalValue;
      }

      dispatch({
        type: "remoteLoadDataStop",
        payload: newState
      });

      triggerInputChangeValue(
        inputRef.current,
        remoteSearch ? undefined : searchValue.current
      );
    },
    //eslint-disable-next-line
    [loadData, showLevels, formatRender, remoteSearch, internalValue, value]
  );

  const checkSelectAllStatus = (values, ignoreEmpty: boolean = false) => {
    let checked = true;
    if (!multiple) return;

    if (
      !ignoreEmpty &&
      (!values || !values.length) &&
      emptyIsAll &&
      !searchValue.current
    ) {
      return selectAll();
    }

    if (showCheckedStrategy === "SHOW_PARENT") {
      checked = isAllItemsChecked(values, mainLevelItems.current);
    } else {
      checked = values.length === internalTreeDataCount;
    }
    if (!checked && values.length) {
      return {
        selectAllState: "indeterminate"
      };
    }

    if (checked) {
      return {
        selectAllState: "checked"
      };
    }

    return {
      selectAllState: ""
    };
  };

  const selectAll = () => {
    const state: any = {
      selectAllState: "checked"
    };
    if (mainLevelItems.current) {
      state.internalValue = Array.from(mainLevelItems.current);
    }
    return state;
  };

  const savePrevRefs = () => {
    prevLevel.current = levelSelected.current;
    prevTreeData.current = stateTreeData;
    prevFormatSelected.current = formatSelected.current;
    prevEmptyIsAllRef.current = emptyIsAllRef.current;
  };

  const resetPrevRefs = () => {
    searchValue.current = "";
    prevLevel.current = "1";
    prevTreeData.current = [];
    prevFormatSelected.current = [];
    prevEmptyIsAllRef.current = emptyIsAll;
  };

  const rollbackRefs = () => {
    levelSelected.current = prevLevel.current;
    formatSelected.current = prevFormatSelected.current;

    emptyIsAllRef.current = prevEmptyIsAllRef.current;
    mainLevelItems.current = getMainLevelItems(
      prevTreeData.current,
      levelSelected.current
    );
  };

  const openDrawer = () => {
    drawerVisibleRef.current = true;
    savePrevRefs();

    dispatch({
      type: "openDrawer",
      payload: checkSelectAllStatus(internalValue)
    });
    triggerInputChangeValue(inputRef.current, searchValue.current);
  };

  const closeDrawer = useCallback(() => {
    setTimeout(() => {
      const activeElement = document.activeElement as HTMLElement;
      activeElement.blur();
    }, 100);

    resetPrevRefs();

    drawerVisibleRef.current = false;

    //eslint-disable-next-line
  }, []);

  const isSelectedAll = useMemo(() => {
    return selectAllState === "checked" && emptyIsAllRef.current;
  }, [selectAllState]);

  //  -------- HANDLERS --------

  const handlerDrawerCancel = useCallback(() => {
    const prevValue = !multiple && !value ? [] : value;
    //@ts-ignore
    if (prevValue.length === 0) showAllRef.current = true;

    dispatch({
      type: "drawerCancel",
      payload: {
        stateTreeData: prevTreeData.current,
        internalValue: prevValue
      }
    });
    rollbackRefs();
    closeDrawer();

    setTimeout(() => {
      showAllRef.current = false;
    }, 200);
  }, [closeDrawer, value, multiple, dispatch]);

  const handlerDrawerSubmit = useCallback(() => {
    closeDrawer();
    dispatch({
      type: "drawerSubmit"
    });
    triggerOnChange(internalValue);
  }, [triggerOnChange, closeDrawer, internalValue, dispatch]);

  const handlerDrawerFocus = e => {
    if (internalLoading) return;
    setInputRef(e.target);
    openDrawer();
  };

  const handlerSearchInputChange = useCallback(
    e => {
      searchValue.current = e.target.value;

      if (remoteSearch) {
        internalLoadData();
        return;
      }
      setSearchValue(searchValue.current);

      triggerInputChangeValue(inputRef.current, searchValue.current);
    },
    //eslint-disable-next-line
    [inputRef, internalLoadData]
  );

  const handlerSelectBeforeBlur = useCallback(() => !drawerVisible, [
    drawerVisible
  ]);

  const handleTreeSelect = useCallback(
    (_, node) => {
      dispatch({
        type: "setSelected",
        payload: node
      });
    },
    [dispatch]
  );

  const handleTreeSelectChange = useCallback(
    (value, labels, extra) => {
      let state: any = {};
      if (multiple) {
        state.internalValue = value;
        if (value) {
          const check = checkSelectAllStatus(value, true);
          state = { ...state, ...check };
        }
      } else {
        state.internalValue = extra.checked ? [extra.triggerValue] : [];
      }

      dispatch({
        type: "setState",
        payload: state
      });

      if (!drawerVisible) {
        triggerOnChange(value);
      }
    },
    //eslint-disable-next-line
    [drawerVisible, triggerOnChange, multiple]
  );

  const handlerTreeExpand = useCallback(
    expandedKeys => {
      dispatch({
        type: "internalTreeExpandedKeys",
        payload: expandedKeys
      });
    },
    [dispatch]
  );

  const handleLevelChange = (level: string) => {
    levelSelected.current = level;
    onLevelChange && onLevelChange(level);
    internalLoadData(false, []);
  };

  const handleTreeLoadData = async node => {
    const index = stateTreeData.findIndex(item => item.pId === node.id);
    if (index !== -1) return;
    const data = await loadChildren(node.id, additionalFilters);

    dispatch({
      type: "stateTreeData",
      payload: stateTreeData.concat(data)
    });

    triggerInputChangeValue(inputRef.current, searchValue.current);
  };

  const handleSelectAllChange = e => {
    const checked = e.target.checked;
    let state: any = {};
    if (checked) {
      state = selectAll();
    } else {
      state = {
        selectAllState: "",
        internalValue: []
      };
    }

    dispatch({
      type: "setState",
      payload: state
    });
  };

  // ---- EFFECTS ------

  useEffect(() => {
    dispatch({
      type: "internalValue",
      payload: !multiple && !value ? [] : value
    });
  }, [value, multiple, dispatch]);

  useEffect(() => {
    if (treeData) {
      mainLevelItems.current = getMainLevelItems(
        treeData,
        levelSelected.current
      );
      prevTreeData.current = stateTreeData;
    }

    dispatch({
      type: "setState",
      payload: {
        stateTreeData: treeData,
        internalTreeDataCount: treeDataCount
      }
    });
    //eslint-disable-next-line
  }, [treeData, treeDataCount, dispatch]);

  useEffect(() => {
    dispatch({
      type: "setState",
      payload: {
        internalLoading: loading
      }
    });
  }, [loading, dispatch]);

  useEffect(() => {
    !asyncData && loadData && internalLoadData(true);
    //eslint-disable-next-line
  }, [asyncData, additionalFilters]);

  // -------- RENDERS ---------

  const tagRender = props => {
    if (internalLoading) {
      return (
        <span className="ant-select-selection-placeholder">{loadingText}</span>
      );
    }
    if (isSelectedAll || showAllRef.current) {
      return (
        <span className="ant-select-selection-placeholder">{placeholder}</span>
      );
    }

    return (
      <span className="ant-select-selection-item">
        <Tag
          closable={props.closable}
          onClose={props.onClose}
          className="ant-select-selection-item-content"
        >
          {props.label}
        </Tag>
      </span>
    );
  };

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
            "drawer-tree-select-dropdown-flat-list": isFlatList
          })}
          title={drawerTitle ? drawerTitle : placeholder}
          onClose={handlerDrawerCancel}
          visible={drawerVisible}
          width={
            window.innerWidth < drawerWidth ? window.innerWidth : drawerWidth
          }
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
              <Checkbox
                onChange={handleSelectAllChange}
                checked={selectAllState === "checked"}
                indeterminate={selectAllState === "indeterminate"}
              >
                {selectAllText}
              </Checkbox>
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
    (showSelectAll ? 34 : 0);

  return (
    <AntTreeSelect
      {...restProps}
      value={internalValue}
      className="drawer-tree-select"
      treeData={stateTreeData}
      open={drawerVisible}
      treeExpandedKeys={internalTreeDefaultExpandedKeys}
      searchValue={searchValue.current ? searchValue.current : ""}
      //@ts-ignore
      dropdownRender={dropdownRender}
      dropdownClassName="drawer-tree-select-dropdown-fake"
      multiple={multiple}
      showSearch={true}
      listHeight={listHeight}
      placeholder={placeholder}
      loading={internalLoading}
      notFoundContent={internalLoading ? loadingText : noDataText}
      showCheckedStrategy={
        searchValue.current ? "SHOW_CHILD" : showCheckedStrategy
      }
      loadData={loadChildren ? handleTreeLoadData : null}
      onBeforeBlur={handlerSelectBeforeBlur}
      onChange={handleTreeSelectChange}
      onFocus={handlerDrawerFocus}
      onTreeExpand={handlerTreeExpand}
      onSelect={handleTreeSelect}
      tagRender={tagRender}
    />
  );
};

DrawerTreeSelect.defaultProps = {
  maxTagCount: 10,
  treeDataCount: 0,
  showLevels: false,
  isFlatList: false,
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
  emptyIsAll: false,
  levels: []
};

DrawerTreeSelect.SHOW_ALL = AntTreeSelect.SHOW_ALL;
DrawerTreeSelect.SHOW_CHILD = AntTreeSelect.SHOW_CHILD;
DrawerTreeSelect.SHOW_PARENT = AntTreeSelect.SHOW_PARENT;

export default DrawerTreeSelect;
