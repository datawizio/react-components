import React, { useState, useCallback, useMemo } from "react";

import { Select as AntSelect } from "antd";
import { SelectProps as AntSelectProps, SelectValue } from "antd/lib/select";

import "./index.less";

export const Option = AntSelect.Option;
export const OptGroup = AntSelect.OptGroup;

export interface SelectProps<VT> extends AntSelectProps<VT> {
  /**
   * Функция которая будет вызываться для подгрузки данных с параметрами `searchValue`, `page`
   */
  loadData?: (string, number) => [any];

  /**
   * Данные будут загружаться ассинхронно. Будет вызываться функция `loadData`
   */
  asyncData?: boolean;

  /**
   * Текст Loading...
   */
  loadingContent?: string;

  /**
   * Подгрузка ассинхронных данных с пагинацией
   */
  withPagination?: boolean;
}

function dataToOptions(data: [any]) {
  return data.map(item => (
    <Option key={item.value} value={item.value}>
      {item.text}
    </Option>
  ));
}

const Select: React.FC<SelectProps<SelectValue>> = props => {
  const {
    loadingContent,
    notFoundContent,
    loadData,
    withPagination,
    asyncData,
    ...restProps
  } = props;

  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [page, setPage] = useState(0);

  if (true) {
    const [a, setA] = useState(false);
  }

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

  const handleSearch = () => {
    loadPage(0);
  };

  const searchProps = useMemo(
    () =>
      asyncData && withPagination
        ? {
            onSearch: handleSearch,
            filterOption: false,
            onPopupScroll: handlePopupScroll
          }
        : {},
    [handleSearch, handlePopupScroll]
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

export default Select;
