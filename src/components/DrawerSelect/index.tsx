import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect
} from "react";

import AntSelect, { SelectProps as AntSelectProps } from "./AntSelect";
import { SelectValue } from "antd/lib/tree-select";

import SearchInput from "../SearchInput";
import Drawer from "../Drawer";
import Button from "../Button";

import "./index.less";
import clsx from "clsx";
import { AntTreeNode } from "antd/lib/tree";
import { triggerInputChangeValue } from "../../utils/trigger";
import { Skeleton } from "antd";

export interface DrawerSelectProps<VT>
  extends Omit<AntSelectProps<VT>, "onChange"> {
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
  loadData?: (string, number) => { data: [any]; totalPages: number };

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

function convertOptions(options, valueProp: string, labelProp: string) {
  return options.map(opt => ({
    ...opt,
    value: opt[valueProp],
    label: opt[labelProp]
  }));
}

const DrawerSelect: React.FC<DrawerSelectProps<SelectValue>> = props => {
  const {
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
    valueProp,
    mode,
    multiple,
    withPagination,
    ...restProps
  } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [internalValue, setInternalValue] = useState<SelectValue>(value);
  const [selected, setSelected] = useState<AntTreeNode>();
  const menuRef = useRef();

  const internalOptions = useMemo(() => {
    return options ? convertOptions(options, valueProp, labelProp) : [];
  }, [options, valueProp, labelProp]);

  const [optionsState, setOptions] = useState(internalOptions);

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
      }
      onChange(value);
    },
    [selected, multiple, onChange]
  );

  const loadPage = useCallback(
    async (search, page = 0) => {
      if (!loadData) return;
      if (page >= totalPages) {
        return;
      }
      if (!page) setOptions([]);

      setLoading(true);

      const { data, totalPages: pages } = await loadData(search, page);
      const options = convertOptions(data, valueProp, labelProp);
      if (page === 0) {
        setOptions(options);
      } else {
        setOptions(optionsState.concat(options));
      }

      setPage(page);
      setTotalPages(pages);

      setLoading(false);
    },
    [
      loadData,
      setPage,
      setLoading,
      setOptions,
      optionsState,
      valueProp,
      labelProp,
      totalPages
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

    setDrawerVisible(false);
    setSearchValue("");
  }, []);

  const handleDrawerCancel = useCallback(() => {
    closeDrawer();
    setInternalValue(value);
  }, [closeDrawer, value]);

  const handleDrawerSubmit = useCallback(() => {
    closeDrawer();
    triggerOnChange(internalValue);
  }, [triggerOnChange, closeDrawer, internalValue]);

  const handleDrawerFocus = e => {
    setInputRef(e.target);
    setDrawerVisible(true);
    triggerInputChangeValue(inputRef.current, searchValue);
  };

  const handleSearchInputChange = e => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
    triggerInputChangeValue(inputRef.current, inputValue);
  };

  const handleSelectBeforeBlur = useCallback(() => !drawerVisible, [
    drawerVisible
  ]);

  const handleSelect = useCallback(
    (_, node) => {
      setSelected(node);
    },
    [setSelected]
  );

  const handleSearch = useCallback(
    searchValue => {
      loadPage(searchValue);
    },
    [loadPage]
  );

  const handleChange = useCallback(
    (value, el) => {
      if (multiple) {
        setInternalValue(value);
      } else {
        setInternalValue(value[1] ? [value[1]] : [value[0]]);
      }
      if (!drawerVisible) {
        triggerOnChange(value);
      }
    },
    [drawerVisible, triggerOnChange, multiple]
  );

  const handlePopupScroll = useCallback(
    e => {
      const { target } = e;
      //debounce?
      if (loading) return;
      if (page === totalPages - 1) return;
      if (target.scrollTop + target.offsetHeight >= target.scrollHeight - 100) {
        loadPage(searchValue, page + 1);
      }
    },
    [loading, page, loadPage, searchValue, totalPages]
  );

  // ------- EFFECTS ----------
  useEffect(() => {
    setInternalValue(value);
    return () => {};
  }, [value]);

  useEffect(() => {
    !asyncData && loadData && loadPage("");
    return () => {};
    //eslint-disable-next-line
  }, [asyncData, loadData]);

  // -------- RENDERS ---------
  const dropdownRender = menu => {
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
        width={drawerWidth}
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
          loading={loading}
        />
        {menu}
        <div className="drawer-select-loader-container">
          {loading && (
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
  };

  return (
    <AntSelect
      {...restProps}
      value={internalValue}
      filterOption={asyncData || loadData ? false : true}
      className="drawer-select"
      mode="multiple"
      open={drawerVisible}
      loading={loading}
      //@ts-ignore
      dropdownRender={dropdownRender}
      dropdownClassName="drawer-select-dropdown-fake"
      showSearch={true}
      onSearch={handleSearch}
      optionFilterProp="title"
      listHeight={window.innerHeight - 215}
      notFoundContent={loading ? loadingText : noDataText}
      onBeforeBlur={handleSelectBeforeBlur}
      onFocus={handleDrawerFocus}
      onSelect={handleSelect}
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
