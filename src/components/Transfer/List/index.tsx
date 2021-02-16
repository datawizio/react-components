import * as React from "react";
import omit from "rc-util/lib/omit";
import classNames from "classnames";
import Checkbox from "../../Checkbox";
import {
  TransferItem,
  TransferDirection,
  RenderResult,
  RenderResultObject,
  LoadDataResponse,
  LoadDataParams
} from "../types";
import defaultRenderList, { OmitProps } from "./ListBody";
import SearchInput from "../../LiteSearchInput";

const defaultRender = () => null;

function isRenderResultPlainObject(result: RenderResult) {
  return (
    result &&
    !React.isValidElement(result) &&
    Object.prototype.toString.call(result) === "[object Object]"
  );
}

export interface RenderedItem {
  renderedText: string;
  renderedEl: React.ReactNode;
  item: TransferItem;
}

export interface TransferListProps {
  prefixCls: string;
  titleText: string;
  dataSource: TransferItem[];
  filterOption?: (filterText: string, item: TransferItem) => boolean;
  checkedKeys: string[];
  // exceptedKeys: string[];
  onItemSelect: (key: string, check: boolean) => void;
  onItemSelectAll: (dataSource: string[]) => void;
  render?: (item: TransferItem) => RenderResult;
  showSearch?: boolean;
  onScroll: (e: React.UIEvent<HTMLUListElement>) => void;
  disabled?: boolean;
  direction: TransferDirection;
  showSelectAll?: boolean;
  actions?: React.ReactElement;
  loadData?: (params: LoadDataParams) => Promise<LoadDataResponse>;
  $filters?: any;
  selectedText: string;
  searchText: string;
  noDataText: string;
}

interface TransferListState {
  /** Filter input value */
  filters: { [key: string]: any };
  filterValue: string;
  page: number;
  count: number;
  totalPages: number;
  dataSource: TransferItem[];
  loading: boolean;
}

export default class TransferList extends React.PureComponent<
  TransferListProps,
  TransferListState
> {
  static defaultProps = {
    dataSource: [],
    titleText: "",
    showSearch: false
  };

  timer: number;

  triggerScrollTimer: number;

  unwatchFilters: () => void;

  exceptedKeys: string[] = [];

  constructor(props: TransferListProps) {
    super(props);
    this.state = {
      filters: {},
      filterValue: "",
      page: 0,
      totalPages: 1,
      count: 0,
      dataSource: [],
      loading: false
    };
  }

  setExceptedKeys(keys: string[]) {
    this.exceptedKeys = keys;
  }

  addExceptedKeys(keys: string[]) {
    this.exceptedKeys = this.exceptedKeys.concat(keys);
  }

  componentWillUnmount() {
    clearTimeout(this.triggerScrollTimer);
    if (this.props.$filters) {
      this.unwatchFilters();
    }
  }

  componentDidMount() {
    this.loadNextPage();
    if (this.props.$filters) {
      this.unwatchFilters = this.props.$filters.watch(filters => {
        this.handleFiltersChange(filters);
      });
    }
  }

  handleFiltersChange(filters: any) {
    this.setState(
      {
        filters,
        page: 0,
        dataSource: []
      },
      () => {
        this.loadNextPage();
      }
    );
  }

  getCheckStatus(filteredItems: TransferItem[]) {
    const { checkedKeys } = this.props;
    if (checkedKeys.length === 0) {
      return "none";
    }
    if (
      filteredItems.every(
        item => checkedKeys.indexOf(item.key) >= 0 || !!item.disabled
      )
    ) {
      return "all";
    }
    return "part";
  }

  onScroll = e => {
    const { target } = e;

    //debounce?
    if (this.state.loading) return;
    if (target.scrollTop + target.offsetHeight >= target.scrollHeight - 100) {
      this.loadNextPage();
    }
  };

  async loadNextPage() {
    let { page, totalPages, filterValue, dataSource, filters } = this.state;
    const { loadData } = this.props;
    this.setExceptedKeys([]);

    if (page !== 0 && page >= totalPages) {
      return;
    }
    page++;
    this.setState({
      loading: true
    });

    const filtersReq = {
      page,
      search: filterValue,
      ...filters
    };

    const { data, totalPages: pages, count } = await loadData(filtersReq);

    this.setState({
      page,
      count,
      totalPages: pages,
      dataSource: dataSource.concat(data),
      loading: false
    });
  }

  getListBody(
    prefixCls: string,
    filterValue: string,
    filteredItems: TransferItem[],
    checkedKeys: string[],
    loading?: boolean,
    showSearch?: boolean,
    disabled?: boolean
  ): React.ReactNode {
    const search = showSearch ? (
      <div className={`${prefixCls}-body-search-wrapper`}>
        <SearchInput
          placeholder={this.props.searchText}
          onChange={this.handleFilter}
          onClear={this.handleClear}
          value={filterValue}
          disabled={disabled}
        />
      </div>
    ) : null;

    const bodyContent = defaultRenderList({
      ...omit(this.props, OmitProps),
      loading,
      filteredItems,
      onScroll: this.onScroll,
      selectedKeys: checkedKeys
    });

    let bodyNode: React.ReactNode;
    // We should wrap customize list body in a classNamed div to use flex layout.

    bodyNode =
      filteredItems.length || loading ? (
        bodyContent
      ) : (
        <div className={`${prefixCls}-body-not-found`}>
          {this.props.noDataText}
        </div>
      );

    return (
      <div
        className={classNames(
          showSearch
            ? `${prefixCls}-body ${prefixCls}-body-with-search`
            : `${prefixCls}-body`
        )}
      >
        {search}
        {bodyNode}
      </div>
    );
  }

  getFilteredItems(dataSource: TransferItem[]): TransferItem[] {
    if (this.exceptedKeys[0] && this.exceptedKeys[0] === "all") return [];
    const set = new Set([...this.exceptedKeys]);

    return dataSource.filter(item => !set.has(item.key));
  }

  getCheckBox(
    filteredItems: TransferItem[],
    onItemSelectAll: (dataSource: string[]) => void,
    showSelectAll?: boolean,
    disabled?: boolean
  ): false | JSX.Element {
    const checkStatus = this.getCheckStatus(filteredItems);
    const checkedAll = checkStatus === "all";
    const checkAllCheckbox = showSelectAll !== false && (
      <Checkbox
        disabled={disabled}
        checked={checkedAll}
        indeterminate={checkStatus === "part"}
        onChange={() => {
          const items = checkedAll
            ? []
            : filteredItems
                .filter(item => !item.disabled)
                .map(({ key }) => key);
          // Only select enabled items
          onItemSelectAll(items);
        }}
      />
    );

    return checkAllCheckbox;
  }

  handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value: filterValue }
    } = e;
    this.setState({ filterValue, dataSource: [], page: 0 }, () => {
      this.loadNextPage();
    });
  };

  handleClear = () => {
    this.setState({ filterValue: "", dataSource: [], page: 0 }, () => {
      this.loadNextPage();
    });
  };

  matchFilter = (item: TransferItem) => {
    const { filterValue } = this.state;
    return item.title.indexOf(filterValue) >= 0;
  };

  renderItem = (item: TransferItem): RenderedItem => {
    const { render = defaultRender } = this.props;
    const renderResult: RenderResult = render(item);
    const isRenderResultPlain = isRenderResultPlainObject(renderResult);
    return {
      renderedText: isRenderResultPlain
        ? (renderResult as RenderResultObject).value
        : (renderResult as string),
      renderedEl: isRenderResultPlain
        ? (renderResult as RenderResultObject).label
        : renderResult,
      item
    };
  };

  render() {
    const { filterValue, dataSource, loading, count } = this.state;
    const {
      prefixCls,
      titleText,
      selectedText,
      checkedKeys,
      disabled,
      showSearch,
      onItemSelectAll,
      showSelectAll,
      actions
    } = this.props;

    const totalCount =
      this.exceptedKeys[0] && this.exceptedKeys[0] === "all"
        ? 0
        : count - this.exceptedKeys.length;

    // ====================== Get filtered, checked item list ======================

    const filteredItems = this.getFilteredItems(dataSource);

    // ================================= List Body =================================

    const listBody = this.getListBody(
      prefixCls,
      filterValue,
      filteredItems,
      checkedKeys,
      loading,
      showSearch,
      disabled
    );

    // ================================ List Footer ================================

    const checkAllCheckbox = this.getCheckBox(
      filteredItems,
      onItemSelectAll,
      showSelectAll,
      disabled
    );

    // ================================== Render ===================================
    return (
      <div className={`${prefixCls}-container`}>
        <div className={`${prefixCls}-title`}>
          <span className={`${prefixCls}-title-text`}>{titleText}</span>
          <div>{actions}</div>
        </div>
        <div className={prefixCls}>
          {/* Title */}

          {/* Header */}
          <div className={`${prefixCls}-header`}>
            {checkAllCheckbox}
            <span className={`${prefixCls}-header-selected`}>
              {selectedText}: {checkedKeys.length} / {totalCount}
            </span>
          </div>

          {/* Body */}
          {listBody}
        </div>
      </div>
    );
  }
}
