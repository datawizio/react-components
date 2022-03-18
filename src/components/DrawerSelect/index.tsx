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

import "./index.less";

export interface DrawerSelectProps<VT>
  extends Omit<AntSelectProps<VT>, "onChange"> {
  additionalFilters?: any;
  /**
   * Данные будут загружаться ассинхронно. Будет вызываться функция `loadData`
   */
  asyncData?: boolean;

  /**
   * Title Drawer-а
   */
  drawerTitle?: string;

  /**
   * Drawer width in px
   */
  drawerWidth?: number;

  /**
   * Label prop
   */
  labelProp?: string;

  /**
   * Функция которая будет вызываться для подгрузки данных с параметрами `searchValue`, `page`
   */
  loadData?: (
    filters: any,
    page: number,
    search: string
  ) => Promise<{ data: any; totalPages: number }>;

  /**
   * Function for customized options
   * */
  optionRender?: (option: any) => any;

  multiple?: boolean;

  /**
   * Value prop
   */
  valueProp?: string;

  /**
   * max selected count
   */

  maxSelectedCount?: number;

  maxTagLength?: number;

  /**
   * Подгрузка ассинхронных данных с пагинацией
   */
  withPagination?: boolean;

  /**
   * Event when user clicks Submit
   */
  onChange?: (values: SelectValue, selected?: AntTreeNode) => void;

  onCheckSelectedValue?: (values: SelectValue) => void;

  valueToUncheck?: string | number;

  onLoadData?: (data: any, value: any) => { value?: any };
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
    showCheckAll,
    checkAllTitle,
    checkAllKey,
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
    onLoadData,
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

  const [
    {
      internalLoading,
      page,
      totalPages,
      drawerVisible,
      searchValue,
      internalValue,
      selected,
      optionsState
    },
    dispatch
  ] = useDrawerSelect({
    internalLoading: loading,
    page: 0,
    totalPages: 1,
    drawerVisible: false,
    searchValue: "",
    internalValue: undefined,
    selected: undefined,
    optionsState: []
  });

  const selectedOptions = useRef<any[]>([]);
  const menuRef = useRef();
  const firstLoadedOptions = useRef<any[]>([]);

  const internalOptions = useMemo(() => {
    return options ? convertOptions(options, valueProp, labelProp).options : [];
  }, [options, valueProp, labelProp]);

  const inputRef = useRef<HTMLInputElement>();

  const setInputRef = (el: HTMLInputElement) => {
    if (el.classList.contains("ant-select-selection-search-input")) {
      inputRef.current = el;
    }
  };

  const triggerOnChange = useCallback(
    value => {
      if (!onChange) return;
      if (!multiple) {
        onChange(value, value ? selected : undefined);
        return;
      }
      onChange(value);
    },
    [selected, multiple, onChange]
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
      onLoadData
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
      selectedOptions.current.push(node);
      dispatch({
        type: "setSelected",
        payload: node
      });
    },
    [dispatch, onCheckSelectedValue]
  );

  const handleDeselect = useCallback((_, node) => {
    const index = selectedOptions.current.findIndex(
      option => option.key === node.key
    );
    selectedOptions.current.splice(index, 1);
  }, []);

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
    },
    [dispatch, drawerVisible, triggerOnChange, multiple, maxSelectedCount]
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

  useEffect(() => {
    !asyncData && loadData && loadPage("", 0, true);
    return () => {};
    //eslint-disable-next-line
  }, [asyncData, additionalFilters]);

  // -------- RENDERS ---------

  const tagRender = useCallback(
    ({ label, closable, onClose }) => {
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
            title={label}
          >
            {isLongTag ? `${label.slice(0, maxLength)}...` : label}
          </Tag>
        </span>
      );
    },
    [optionsState, loadingText]
  );
  const dropdownRender = useCallback(
    menu => {
      menuRef.current = menu;
      return (
        <Drawer
          className={clsx({
            "drawer-select-dropdown": true,
            "drawer-select-dropdown-show-all": showCheckAll
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
          <SearchInput
            placeholder={drawerSearchPlaceholder}
            value={searchValue}
            onChange={handleSearchInputChange}
            loading={internalLoading}
          />
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
    [searchValue, internalLoading, drawerVisible, internalValue]
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
    dropdownClassName: "drawer-select-dropdown-fake",
    showSearch: true,
    onSearch: handleSearch,
    optionFilterProp: optionFilterProp || "label",
    optionLabelProp: optionLabelProp || "label",
    listHeight: window.innerHeight - 198 - (multiple ? 27 : 0),
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
