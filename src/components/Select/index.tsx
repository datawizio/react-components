import React, { useState, useCallback, useMemo } from "react";
import { Select as AntSelect, Tag } from "antd";
import i18n from "i18next";
import { useDebouncedCallback } from "use-debounce";
import { FCSelect } from "./types";
import { getUniqueItemsObj } from "../../utils/data/dataHelpers";
import "./index.less";

const Select: FCSelect = props => {
  const {
    asyncData,
    loadingContent,
    notFoundContent,
    loadData,
    withPagination,
    useCustomTagRender,
    optionRender,
    optionFilterProp,
    optionLabelProp,
    ...restProps
  } = props;

  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [rawOptions, setRawOptions] = useState({});
  const [page, setPage] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const dataToOptions = (data: [any]) => {
    return data.map(item => {
      if (optionRender) {
        return optionRender(item);
      }
      return (
        <Select.Option
          key={item.value}
          value={item.value}
          label={item.text}
          disabled={!!item.disabled}
        >
          {item.text}
        </Select.Option>
      );
    });
  };

  const [loadPage] = useDebouncedCallback(async (searchValue, page = 0) => {
    if (!loadData) return;

    setLoading(true);

    try {
      const data = await loadData(searchValue, page);

      const dataIsArray = Array.isArray(data);
      //@ts-ignore
      const dataOptions = dataIsArray ? data : data.options;
      //@ts-ignore
      const next = dataIsArray ? true : data.next;

      setRawOptions(getUniqueItemsObj(options, rawOptions, "value", "text"));

      if (page) {
        setOptions(options.concat(dataToOptions(dataOptions)));
      } else {
        setOptions(dataToOptions(dataOptions));
      }

      if (next === null) {
        setIsLast(true);
      }

      setPage(page as any);
    } catch (e) {
      setIsLast(true);
    } finally {
      setLoading(false);
    }
  }, 500);

  const handlePopupScroll = useCallback(
    e => {
      const { target } = e;

      //debounce?
      if (loading) return;
      if (
        target.scrollTop + target.offsetHeight >= target.scrollHeight - 100 &&
        !isLast
      ) {
        loadPage(searchValue, page + 1);
      }
    },
    [loading, page, searchValue, isLast, loadPage]
  );

  const handleDropdownVisibleChange = useCallback(
    (open: boolean) => {
      if (open && asyncData) {
        loadPage(searchValue, 0);
        setIsLast(false);
      } else if (!open) {
        setSearchValue("");
        setOptions([]);
      }
    },
    [asyncData, searchValue, loadPage]
  );

  const handleSearch = useCallback(
    searchString => {
      setSearchValue(searchString);
      setIsLast(false);
      loadPage(searchString);
    },
    [loadPage]
  );

  const searchProps = useMemo(
    () =>
      asyncData && withPagination
        ? {
            searchValue,
            onSearch: handleSearch,
            filterOption: false,
            onPopupScroll: handlePopupScroll
          }
        : {},
    [handleSearch, handlePopupScroll, withPagination, asyncData, searchValue]
  );

  const tagRender = props => {
    const label =
      typeof props.label === "string" ? props.label : rawOptions[props.value];

    return (
      <span className="ant-select-selection-item">
        <Tag
          closable={props.closable}
          onClose={props.onClose}
          className="ant-select-selection-item-content"
        >
          {label}
        </Tag>
      </span>
    );
  };

  return (
    <AntSelect
      {...restProps}
      {...searchProps}
      optionFilterProp={optionFilterProp || "label"}
      optionLabelProp={optionLabelProp || "label"}
      notFoundContent={loading ? loadingContent : notFoundContent}
      loading={loading}
      tagRender={useCustomTagRender ? tagRender : null}
      onDropdownVisibleChange={
        asyncData ? handleDropdownVisibleChange : props.onDropdownVisibleChange
      }
    >
      {asyncData ? options : props.children}
    </AntSelect>
  );
};

Select.defaultProps = {
  asyncData: false,
  loadingContent: `${i18n.t("NO_DATA")}...`,
  notFoundContent: i18n.t("NO_DATA"),
  withPagination: false
};

Select.Option = AntSelect.Option;
Select.OptGroup = AntSelect.OptGroup;

export default Select;
