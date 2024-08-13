import React, {
  useRef,
  useCallback,
  useMemo,
  useEffect,
  useContext
} from "react";
import clsx from "clsx";
import AntSelect, { SelectProps as AntSelectProps } from "./antd/AntSelect";
import { SelectValue } from "antd/lib/tree-select";
import SearchInput from "../SearchInput";
import Drawer from "../Drawer";
import Button from "../Button";
import { Skeleton, Tag, message } from "antd";
import { AntTreeNode } from "antd/lib/tree";
import ConfigContext from "../ConfigProvider/context";
import { triggerInputChangeValue } from "../../utils/trigger";
import { getUniqueItems } from "../../utils/data/dataHelpers";
import { useDrawerSelect } from "./useDrawerSelect";
import { Markers } from "../DrawerTreeSelect/Markers";
import Checkbox from "../Checkbox";
import "./index.less";

export interface DrawerSelectProps<VT>
  extends Omit<AntSelectProps<VT>, "onChange"> {
  additionalFilters?: any;
  asyncData?: boolean;
  hideSearch?: boolean;
  drawerTitle?: string;
  drawerWidth?: number;
  labelProp?: string;
  loadData?: (
    filters: any,
    page: number,
    search: string
  ) => Promise<{ data: any; totalPages: number }>;

  /** Function for customized options */
  optionRender?: (option: any) => any;
  noticeRender?: React.ReactElement | null;
  labelPropOptions?: React.ReactElement | null;
  multiple?: boolean;
  valueProp?: string;
  maxSelectedCount?: number;
  maxTagLength?: number;
  withPagination?: boolean;

  /** Event when user clicks Submit */
  onChange?: (obj: {
    value: SelectValue;
    markers: string[] | number[];
    selected?: AntTreeNode;
  }) => void;
  onCheckSelectedValue?: (values: SelectValue) => void;
  onDrawerCancel?: () => void;
  valueToUncheck?: string | number;
  onLoadData?: (data: any, value: any) => { value?: any };
  loadMarkersChildren?: (id: string, filters?: any) => Promise<any>;
  markersTree?: any;
  selectedMarkers?: string[] | number[];
  markersFieldPlaceholder?: string;
  showMarkers?: boolean;
  onMarkerChange?: (markers: any) => void;
  markersFilterName?: string;
  showSelectAll?: boolean;
}

function extractProperty(array: Array<object>, propertyName: string) {
  return array.map(item => item[propertyName]);
}

function convertOptions(
  source,
  valueProp: string,
  labelProp: string,
  selectedOptions: any[] = [],
  value: string[] = []
) {
  const selected = [];
  const options = [];
  const set = new Set(Array.isArray(value) ? value : [value]);

  const selectedIds = selectedOptions.map(item => item[valueProp]);
  const selectedSet = new Set(selectedIds);

  source.forEach(opt => {
    const obj = {
      ...opt,
      value: opt[valueProp],
      label: opt[labelProp]
    };
    if (selectedSet.has(opt[valueProp])) {
      selected.push(obj);
      return;
    }
    if (set.has(opt[valueProp])) {
      selected.push(obj);
      return;
    }

    options.push(obj);
  });

  return {
    options,
    selected
  };
}

const DrawerSelect: React.FC<DrawerSelectProps<SelectValue>> = props => {
  const {
    additionalFilters,
    asyncData,
    hideSearch,
    showSelectAll,
    drawerTitle,
    drawerWidth,
    value,
    isFlatList,
    onChange,
    valueToUncheck,
    onCheckSelectedValue,
    options,
    optionRender,
    optionFilterProp,
    optionLabelProp,
    labelProp,
    loadData,
    loading,
    valueProp,
    mode,
    multiple,
    withPagination,
    maxSelectedCount,
    maxTagLength,
    noticeRender,
    labelPropOptions,
    onDrawerCancel,
    onLoadData,
    loadMarkersChildren,
    markersTree,
    selectedMarkers,
    markersFieldPlaceholder,
    showMarkers,
    onMarkerChange,
    markersFilterName,
    ...restProps
  } = props;

  const { translate } = useContext(ConfigContext);

  const drawerSearchPlaceholder = useMemo(() => translate("SEARCH"), [
    translate
  ]);

  const noDataText = useMemo(() => translate("NO_DATA"), [translate]);
  const loadingText = useMemo(() => translate("LOADING"), [translate]);
  const submitText = useMemo(() => translate("SUBMIT"), [translate]);
  const cancelText = useMemo(() => translate("CANCEL"), [translate]);
  const selectAllText = useMemo(() => translate("ALL"), [translate]);

  const [
    {
      internalLoading,
      page,
      totalPages,
      drawerVisible,
      searchValue,
      internalValue,
      selected,
      selectAllState,
      optionsState
    },
    dispatch
  ] = useDrawerSelect({
    internalLoading: loading,
    page: 0,
    totalPages: 1,
    drawerVisible: false,
    searchValue: "",
    selectAllState: "",
    internalValue: undefined,
    selected: undefined,
    optionsState: []
  });

  const selectedOptions = useRef<any[]>([]);
  const menuRef = useRef();
  const firstLoadedOptions = useRef<any[]>([]);

  const markersSelected = useRef<string[] | number[]>(selectedMarkers || []);
  const markersChanged = useRef<boolean>(!!selectedMarkers?.length);

  const internalOptions = useMemo(() => {
    return options ? convertOptions(options, valueProp, labelProp).options : [];
  }, [options, valueProp, labelProp]);

  const inputRef = useRef<HTMLInputElement>();

  const setInputRef = (el: HTMLInputElement) => {
    if (el.classList.contains("ant-select-selection-search-input")) {
      inputRef.current = el;
    }
  };

  // SELECT ALL LOGIC ----------------------------
  // this logic supports only flat list of options

  const checkSelectAllStatus = useCallback(
    (values: string[] | number[], options?: string[] | number[]) => {
      if (!values) values = [];

      if (!multiple) return "";

      const allChecked = values.length === options.length;

      if (!allChecked && values.length) {
        return "indeterminate";
      }

      if (allChecked) {
        return "checked";
      }

      return "";
    },
    [multiple]
  );

  const selectAll = useCallback(() => {
    const state: any = {
      selectAllState: "checked"
    };
    state.internalValue = optionsState.map((option: any) => option.value);
    return state;
  }, [optionsState]);

  const handleSelectAllChange = useCallback(
    e => {
      const checked = e.target.checked;
      let state: any;

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
    },
    [dispatch, selectAll]
  );

  // ---------------------------------------------

  const callOnChange = useCallback(
    (value: any, selected?: AntTreeNode) => {
      onChange?.({
        value: value?.length ? value : [],
        markers: value?.length ? markersSelected.current : [],
        selected
      });
    },
    [onChange, markersSelected]
  );

  const triggerOnChange = useCallback(
    value => {
      if (!onChange) return;
      if (!multiple) {
        if (Array.isArray(value) && !value.length) {
          callOnChange([]);
        } else {
          callOnChange(value, value.length ? selected : undefined);
        }
        return;
      }
      callOnChange(value);
    },
    [onChange, multiple, callOnChange, selected]
  );

  const loadPage = useCallback(
    async (search, page = 0, first = false) => {
      if (!loadData) return;

      if (page !== 0 && page >= totalPages) {
        return;
      }

      let state: any = {};

      if (!page) state.optionsState = [];

      dispatch({
        type: "remoteLoadDataStart",
        payload: state
      });

      const filters = { ...additionalFilters, search };

      filters.selected = extractProperty(selectedOptions.current, valueProp);

      if (showMarkers && markersFilterName) {
        filters[markersFilterName] = markersSelected.current;
      }

      if (first) {
        filters.selected = value;
        filters.first = true;
      }

      const { data, totalPages: pages } = await loadData(filters, page, search);

      if (onLoadData) {
        const { value: loadValue } = onLoadData(data, value);
        if (loadValue) {
          triggerOnChange(loadValue);
        }
      }

      const options = convertOptions(
        data,
        valueProp,
        labelProp,
        first ? [] : selectedOptions.current,
        first ? value : []
      );

      if (first) {
        selectedOptions.current = options.selected;
        firstLoadedOptions.current = options.options;
      }

      state = {
        page: page,
        searchValue: search,
        totalPages: pages
      };

      if (page === 0) {
        state.optionsState = getUniqueItems(
          options.selected.concat(options.options)
        );
      } else {
        state.optionsState = getUniqueItems(
          optionsState.concat(options.options)
        );
      }

      if (showSelectAll && markersSelected.current.length) {
        state.selectAllState = first
          ? checkSelectAllStatus(value, state.optionsState)
          : "checked";
        state.internalValue = first
          ? value
          : state.optionsState.map(option => option.value);
      }

      dispatch({
        type: "remoteLoadDataStop",
        payload: state
      });
    },

    //eslint-disable-next-line
    [
      loadData,
      dispatch,
      optionsState,
      valueProp,
      labelProp,
      totalPages,
      onLoadData,
      selectedMarkers
    ]
  );

  //  -------- HANDLERS --------

  const closeDrawer = useCallback(() => {
    setTimeout(() => {
      const activeElement = document.activeElement as HTMLElement;
      activeElement.blur();
      try {
        //@ts-ignore
        menuRef.current.ref.current.scrollTo(0);
      } catch (e) {}
    }, 100);
  }, []);

  const handleDrawerCancel = useCallback(() => {
    closeDrawer();

    const payload: any = { internalValue: !multiple && !value ? [] : value };

    if (searchValue && loadData) {
      payload.optionsState = getUniqueItems(
        selectedOptions.current.concat(firstLoadedOptions.current)
      );
    }

    dispatch({
      type: "drawerCancel",
      payload
    });

    if (searchValue) handleSearch("");

    onDrawerCancel?.();

    //eslint-disable-next-line
  }, [dispatch, closeDrawer, value, multiple, searchValue, loadData]);

  const handleDrawerSubmit = useCallback(() => {
    closeDrawer();

    const payload: any = {};

    if (searchValue) {
      payload.optionsState = getUniqueItems(
        selectedOptions.current.concat(firstLoadedOptions.current)
      );
    }

    dispatch({
      type: "drawerSubmit",
      payload
    });

    triggerOnChange(internalValue);
    if (searchValue) handleSearch("");

    if (!internalValue?.length) {
      markersSelected.current = [];
    }

    //eslint-disable-next-line
  }, [dispatch, triggerOnChange, closeDrawer, internalValue, searchValue]);

  const handleDrawerFocus = e => {
    setInputRef(e.target);
    dispatch({
      type: "openDrawer"
    });
    triggerInputChangeValue(inputRef.current, searchValue);
  };

  const handleSearchInputChange = e => {
    const inputValue = e.target.value;
    dispatch({
      type: "setSearchValue",
      payload: inputValue
    });
    triggerInputChangeValue(inputRef.current, inputValue);
  };

  const handleSelectBeforeBlur = useCallback(() => !drawerVisible, [
    drawerVisible
  ]);

  const handleSelect = useCallback(
    (selectedKey, node) => {
      if (selectedKey && onCheckSelectedValue)
        onCheckSelectedValue(selectedKey);
      if (!multiple) selectedOptions.current = [];
      selectedOptions.current.push(node);
      dispatch({
        type: "setSelected",
        payload: node
      });
    },
    [dispatch, multiple, onCheckSelectedValue]
  );

  const handleDeselect = useCallback(
    (_, node) => {
      if (!multiple) {
        selectedOptions.current = [];
        return;
      }
      const index = selectedOptions.current.findIndex(
        option => option.key === node.key
      );
      selectedOptions.current.splice(index, 1);
    },
    [multiple]
  );

  const handleSearch = useCallback(
    searchValue => {
      loadPage(searchValue);
    },
    [loadPage]
  );

  const handleChange = useCallback(
    (value, el) => {
      let newValue: any;
      if (multiple) {
        newValue = value;
      } else {
        newValue = value[1] ? [value[1]] : [value[0]];
      }

      if (maxSelectedCount && value.length > maxSelectedCount) {
        const messageKey = "select-over-then-" + maxSelectedCount;
        message.error({
          content: translate("COUNT_MUST_BE_SMALLER_THEN", {
            maxCount: maxSelectedCount
          }),
          key: messageKey
        });

        return;
      }

      dispatch({
        type: "setInternalValue",
        payload: newValue && newValue[0] ? newValue : value
      });

      if (!drawerVisible) {
        triggerOnChange(value);
      }

      if (showSelectAll && markersSelected.current.length) {
        dispatch({
          type: "setState",
          payload: {
            selectAllState: checkSelectAllStatus(newValue, optionsState)
          }
        });
      }
    },
    [
      multiple,
      maxSelectedCount,
      dispatch,
      drawerVisible,
      showSelectAll,
      translate,
      triggerOnChange,
      checkSelectAllStatus,
      optionsState
    ]
  );

  const handlePopupScroll = useCallback(
    e => {
      const { target } = e;
      //debounce?
      if (internalLoading) return;
      if (page === totalPages - 1) return;
      if (target.scrollTop + target.offsetHeight >= target.scrollHeight - 100) {
        loadPage(searchValue, page + 1);
      }
    },
    [internalLoading, page, loadPage, searchValue, totalPages]
  );

  const handleMarkersChange = useCallback(
    (markers: string[] | number[]) => {
      if (!markers) {
        dispatch({
          type: "setState",
          payload: {
            selectAllState: ""
          }
        });
      }
      markersSelected.current = markers;

      onMarkerChange && onMarkerChange(markers);

      dispatch({
        type: "setState",
        payload: { internalValue: [] }
      });

      markersChanged.current = true;

      void loadPage("", 0, false);
    },
    [dispatch, loadPage, onMarkerChange]
  );

  // ------- EFFECTS ----------

  useEffect(() => {
    dispatch({
      type: "setInternalValue",
      payload: !multiple && !value ? [] : value
    });
  }, [dispatch, value, multiple]);

  useEffect(() => {
    if (!internalValue || !valueToUncheck) return;
    const payload = internalValue.filter(v => v !== valueToUncheck);
    dispatch({
      type: "setInternalValue",
      payload
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueToUncheck]);

  useEffect(() => {
    dispatch({
      type: "setState",
      payload: { internalLoading: loading }
    });
  }, [dispatch, loading]);

  useEffect(() => {
    dispatch({
      type: "setState",
      payload: { optionsState: internalOptions }
    });
  }, [dispatch, internalOptions]);

  // Convert option labels if labelProp is changed
  useEffect(() => {
    if (!labelPropOptions) return;

    if (searchValue) {
      dispatch({
        type: "setState",
        payload: { searchValue: "", page: 0 }
      });
      loadPage("", 0, false);
      return;
    }

    let payload = {
      optionsState: []
    };

    dispatch({
      type: "remoteLoadDataStart",
      payload
    });

    const options = convertOptions(
      optionsState,
      valueProp,
      labelProp,
      selectedOptions.current,
      value
    );

    payload.optionsState = getUniqueItems(
      options.selected.concat(options.options)
    );

    dispatch({
      type: "remoteLoadDataStop",
      payload
    });
    //eslint-disable-next-line
  }, [labelProp]);

  useEffect(() => {
    !asyncData && loadData && loadPage("", 0, true);
    return () => {};
    //eslint-disable-next-line
  }, [asyncData, additionalFilters]);

  // -------- RENDERS ---------

  const tagRender = useCallback(
    ({ label, value, closable, onClose }) => {
      const maxLength = maxTagLength || 20;
      const isLongTag = label?.length > maxLength;

      if (!optionsState || optionsState.length === 0) {
        return (
          <span className="ant-select-selection-placeholder">
            {loadingText}
          </span>
        );
      }

      return (
        <span className="ant-select-selection-item">
          <Tag
            closable={closable}
            onClose={onClose}
            className="ant-select-selection-item-content"
            title={label || value}
          >
            {isLongTag ? `${label.slice(0, maxLength)}...` : label || value}
          </Tag>
        </span>
      );
    },
    [maxTagLength, optionsState, loadingText]
  );

  const dropdownRender = useCallback(
    menu => {
      menuRef.current = menu;
      return (
        <Drawer
          className={clsx({
            "drawer-select-dropdown": true,
            "drawer-select-dropdown-show-all": showSelectAll
          })}
          title={drawerTitle ? drawerTitle : restProps.placeholder}
          onClose={handleDrawerCancel}
          visible={drawerVisible}
          width={
            window.innerWidth < drawerWidth ? window.innerWidth : drawerWidth
          }
          actions={
            <>
              <Button onClick={handleDrawerCancel}>{cancelText}</Button>
              <Button onClick={handleDrawerSubmit} type="primary">
                {submitText}
              </Button>
            </>
          }
        >
          {noticeRender}
          {labelPropOptions}
          {showMarkers && (
            <Markers
              treeData={markersTree}
              value={markersSelected.current}
              onChange={handleMarkersChange}
              loadChildren={loadMarkersChildren}
              placeholder={markersFieldPlaceholder}
              style={{ marginBottom: 10 }}
            />
          )}
          {!hideSearch && (
            <SearchInput
              placeholder={drawerSearchPlaceholder}
              value={searchValue}
              onChange={handleSearchInputChange}
              loading={internalLoading}
            />
          )}
          {showSelectAll &&
          !searchValue.current &&
          markersSelected.current.length &&
          internalValue?.length ? (
            <div className="drawer-tree-select-dropdown-toolbar">
              <Checkbox
                onChange={handleSelectAllChange}
                checked={selectAllState === "checked"}
                indeterminate={selectAllState === "indeterminate"}
              >
                {selectAllText}
              </Checkbox>
            </div>
          ) : null}
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
          {multiple && (
            <div className="drawer-select-selected">
              <div className="drawer-select-selected-title">
                {translate("SELECTED")}
              </div>
              <div className="drawer-select-selected-count">
                {internalValue ? internalValue.length : 0}
              </div>
            </div>
          )}
        </Drawer>
      );
    },
    //eslint-disable-next-line
    [
      searchValue,
      internalLoading,
      drawerVisible,
      internalValue,
      labelPropOptions,
      markersTree
    ]
  );

  const properties = {
    filterOption: true,
    ...restProps,
    value: internalValue,
    className: "drawer-select",
    open: drawerVisible,
    loading: internalLoading,
    dropdownRender: dropdownRender,
    searchValue: searchValue,
    tagRender: tagRender,
    noticeRender: noticeRender,
    labelPropOptions: labelPropOptions,
    dropdownClassName: "drawer-select-dropdown-fake",
    showSearch: true,
    onSearch: handleSearch,
    optionFilterProp: optionFilterProp || "label",
    optionLabelProp: optionLabelProp || "label",
    listHeight:
      window.innerHeight -
      198 -
      (multiple ? 27 : 0) -
      (showMarkers ? 60 : 0) -
      (showSelectAll && markersSelected.current.length ? 28 : 0),
    notFoundContent: internalLoading ? loadingText : noDataText,
    onBeforeBlur: handleSelectBeforeBlur,
    onFocus: handleDrawerFocus,
    onSelect: handleSelect,
    onDeselect: handleDeselect,
    onPopupScroll: handlePopupScroll,
    onChange: handleChange
  };

  return optionRender ? (
    <AntSelect {...properties} mode="multiple">
      {optionsState && optionsState.map(option => optionRender(option))}
    </AntSelect>
  ) : (
    <AntSelect {...properties} mode="multiple" options={optionsState} />
  );
};

DrawerSelect.defaultProps = {
  maxTagCount: 10,
  drawerTitle: "",
  drawerWidth: 400,
  labelProp: "title",
  valueProp: "key",
  asyncData: false,
  multiple: false
};

export default DrawerSelect;
