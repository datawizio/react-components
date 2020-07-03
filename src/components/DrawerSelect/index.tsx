import React, { useRef, useCallback, useMemo, useEffect } from "react";

import clsx from "clsx";

import AntSelect, { SelectProps as AntSelectProps } from "./antd/AntSelect";
import { SelectValue } from "antd/lib/tree-select";

import SearchInput from "../SearchInput";
import Drawer from "../Drawer";
import Button from "../Button";
import { Skeleton, Tag } from "antd";

import { AntTreeNode } from "antd/lib/tree";

import { triggerInputChangeValue } from "../../utils/trigger";

import "./index.less";
import { useDrawerSelect } from "./useDrawerSelect";

export interface DrawerSelectProps<VT>
  extends Omit<AntSelectProps<VT>, "onChange"> {
  additionalFilters?: any;
  /**
   * Данные будут загружаться ассинхронно. Будет вызываться функция `loadData`
   */
  asyncData?: boolean;

  /**
   * Cancel text in drawer
   */
  cancelText?: string;

  /**
   * Title Drawerа
   */
  drawerTitle?: string;

  /**
   * Place holder for search field in drawer
   */
  drawerSearchPlaceholder?: string;

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
    page: number
  ) => Promise<{ data: any; totalPages: number }>;

  loadingText?: string;

  multiple?: boolean;

  noDataText?: string;

  /**
   * Submit text in drawer
   */
  submitText?: string;

  /**
   * Value prop
   */
  valueProp?: string;

  /**
   * Подгрузка ассинхронных данных с пагинацией
   */
  withPagination?: boolean;

  /**
   * Event when user click Submit
   */
  onChange?: (values: SelectValue, selected?: AntTreeNode) => void;
}

function convertOptions(
  source,
  valueProp: string,
  labelProp: string,
  selectedOptions: any[] = [],
  value: string[] = []
) {
  const selected = selectedOptions;
  const options = [];
  const set = new Set(value);

  const selectedIds = selected.map(item => item[valueProp]);
  const selectedSet = new Set(selectedIds);

  source.forEach(opt => {
    const obj = {
      ...opt,
      value: opt[valueProp],
      label: opt[labelProp]
    };
    if (selectedSet.has(opt[valueProp])) return;

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
    drawerSearchPlaceholder,
    drawerWidth,
    cancelText,
    submitText,
    value,
    isFlatList,
    onChange,
    options,
    labelProp,
    loadingText,
    noDataText,
    loadData,
    loading,
    valueProp,
    mode,
    multiple,
    withPagination,
    ...restProps
  } = props;

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
      if (!page) state.optionsState = selectedOptions.current;

      dispatch({
        type: "remoteLoadDataStart",
        payload: state
      });

      const filters = { ...additionalFilters, search };

      if (first) {
        filters.selected = value;
      }

      const { data, totalPages: pages } = await loadData(filters, page);

      const options = convertOptions(
        data,
        valueProp,
        labelProp,
        selectedOptions.current,
        first ? value : []
      );

      if (first) {
        selectedOptions.current = options.selected;
      }

      state = {
        page: page,
        totalPages: pages
      };

      if (page === 0) {
        state.optionsState = selectedOptions.current.concat(options.options);
      } else {
        state.optionsState = optionsState.concat(options.options);
      }
      dispatch({
        type: "remoteLoadDataStop",
        payload: state
      });
    },

    //eslint-disable-next-line
    [loadData, dispatch, optionsState, valueProp, labelProp, totalPages]
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
    dispatch({
      type: "drawerCancel",
      payload: {
        internalValue: !multiple && !value ? [] : value
      }
    });
  }, [dispatch, closeDrawer, value, multiple]);

  const handleDrawerSubmit = useCallback(() => {
    closeDrawer();
    dispatch({
      type: "drawerSubmit"
    });
    triggerOnChange(internalValue);
  }, [dispatch, triggerOnChange, closeDrawer, internalValue]);

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
    (_, node) => {
      selectedOptions.current.push(node);
      dispatch({
        type: "setSelected",
        payload: node
      });
    },
    [dispatch]
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

      dispatch({
        type: "setInternalValue",
        payload: newValue
      });

      if (!drawerVisible) {
        triggerOnChange(value);
      }
    },
    [dispatch, drawerVisible, triggerOnChange, multiple]
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
    props => {
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
            closable={props.closable}
            onClose={props.onClose}
            className="ant-select-selection-item-content"
          >
            {props.label}
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
        </Drawer>
      );
    },
    //eslint-disable-next-line
    [searchValue, internalLoading, drawerVisible, internalValue]
  );

  return (
    <AntSelect
      {...restProps}
      value={internalValue}
      filterOption={true}
      className="drawer-select"
      mode="multiple"
      open={drawerVisible}
      loading={internalLoading}
      //@ts-ignore
      dropdownRender={dropdownRender}
      searchValue={searchValue}
      tagRender={tagRender}
      dropdownClassName="drawer-select-dropdown-fake"
      showSearch={true}
      onSearch={handleSearch}
      optionFilterProp="title"
      listHeight={window.innerHeight - 198}
      notFoundContent={internalLoading ? loadingText : noDataText}
      onBeforeBlur={handleSelectBeforeBlur}
      onFocus={handleDrawerFocus}
      onSelect={handleSelect}
      onDeselect={handleDeselect}
      onPopupScroll={handlePopupScroll}
      onChange={handleChange}
      options={optionsState}
    />
  );
};

DrawerSelect.defaultProps = {
  maxTagCount: 10,
  drawerTitle: "",
  drawerSearchPlaceholder: "Search",
  drawerWidth: 400,
  cancelText: "Cancel",
  submitText: "Submit",
  loadingText: "Loading",
  noDataText: "No data",
  labelProp: "title",
  valueProp: "key",
  asyncData: false,
  multiple: false
};

export default DrawerSelect;
