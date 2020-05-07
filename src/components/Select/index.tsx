import React, { useState, useCallback, useMemo } from "react";

import { Select as AntSelect } from "antd";

import { FCSelect } from "./types";

import "./index.less";

function dataToOptions(data: [any]) {
  return data.map(item => (
    <Select.Option key={item.value} value={item.value}>
      {item.text}
    </Select.Option>
  ));
}

const Select: FCSelect = props => {
  const {
    asyncData,
    loadingContent,
    notFoundContent,
    loadData,
    withPagination,
    ...restProps
  } = props;

  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [page, setPage] = useState(0);

  const loadPage = useCallback(
    async (searchValue, page = 0) => {
      if (!loadData) return;
      if (!page) setOptions([]);

      setPage(page);
      setLoading(true);

      const data = await loadData(searchValue, page);
      setOptions(options.concat(dataToOptions(data)));

      setLoading(false);
    },
    [loadData, setPage, setLoading, setOptions, options]
  );

  const handleDropdownVisibleChange = useCallback(
    (open: boolean) => {
      if (open && asyncData) {
        loadPage(0);
      }
    },
    [asyncData, loadPage]
  );

  const handlePopupScroll = useCallback(
    e => {
      const { target } = e;

      //debounce?
      if (loading) return;
      if (target.scrollTop + target.offsetHeight >= target.scrollHeight - 100) {
        loadPage(page + 1);
      }
    },
    [loading, page, loadPage]
  );

  const handleSearch = useCallback(() => {
    loadPage(0);
  }, [loadPage]);

  const searchProps = useMemo(
    () =>
      asyncData && withPagination
        ? {
            onSearch: handleSearch,
            filterOption: false,
            onPopupScroll: handlePopupScroll
          }
        : {},
    [handleSearch, handlePopupScroll, withPagination, asyncData]
  );

  return (
    <AntSelect
      {...restProps}
      {...searchProps}
      notFoundContent={loading ? loadingContent : notFoundContent}
      loading={loading}
      onDropdownVisibleChange={asyncData ? handleDropdownVisibleChange : null}
    >
      {asyncData ? options : props.children}
    </AntSelect>
  );
};

Select.defaultProps = {
  asyncData: false,
  loadingContent: "Loading...",
  notFoundContent: "No data",
  withPagination: false
};

Select.Option = AntSelect.Option;
Select.OptGroup = AntSelect.OptGroup;

export default Select;
