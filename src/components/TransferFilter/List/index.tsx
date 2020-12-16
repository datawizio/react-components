import * as React from "react";
import omit from "omit.js";
import classNames from "clsx";

import Checkbox from "../../Checkbox";
import defaultRenderList, { OmitProps } from "./ListBody";
import SearchInput from "../../LiteSearchInput";

import {
  TransferFilterItem,
  TransferDirection,
  RenderResult,
  RenderResultObject,
  TransferFilterLoadDataResponse,
  TransferFilterLoadDataParams,
  TransferFilterValue,
  ICheckedItem
} from "../types";
import { PaginationType } from "antd/es/transfer/interface";
import { EventDataNode } from "rc-tree/es/interface";
import { isLocalDataSource } from "../helper";

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
  item: TransferFilterItem;
}

export interface TransferListProps {
  checkedKeys: string[];
  dataSource: TransferFilterItem[];
  direction: TransferDirection;
  noDataText: string;
  prefixCls: string;
  selectedText: string;
  searchText: string;
  titleText: string;
  type: "tree" | "list";
  value: TransferFilterValue;
  actions?: React.ReactElement;
  disabled?: boolean;
  local?: boolean;
  pagination?: PaginationType;
  showSearch?: boolean;
  showSelectAll?: boolean;
  $filters?: any;
  render?: (item: TransferFilterItem) => RenderResult;
  filterOption?: (filterText: string, item: TransferFilterItem) => boolean;
  loadData?: (
    params: TransferFilterLoadDataParams
  ) => Promise<TransferFilterLoadDataResponse>;
  loadDataByIds?: (params: any) => Promise<any>;
  onItemSelect: (item: ICheckedItem, check: boolean) => void;
  onItemsSelect?: (items: ICheckedItem[]) => void;
}

interface TransferListState {
  /** Filter input value */
  filters: { [key: string]: any };
  filterValue: string;
  page: number;
  count: number;
  totalPages: number;
  dataSource: TransferFilterItem[];
  loading: boolean;
  expandedKeys: string[];
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

  bodyRef: any;

  timer: number;

  triggerScrollTimer: number;

  unwatchFilters: () => void;

  constructor(props: TransferListProps) {
    super(props);
    this.state = {
      filters: {},
      filterValue: "",
      page: 0,
      totalPages: 1,
      count: 0,
      dataSource: [],
      loading: false,
      expandedKeys: []
    };
    this.bodyRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value.include !== this.props.value.include) {
      if (this.props.direction === "right") {
        if (this.props.value.include === null) {
          this.setState({ dataSource: [] });
          return;
        }
        if (
          this.props.value.include.length === 0 &&
          (prevProps.value.include === null ||
            prevProps.value.include.length > 0)
        ) {
          this.loadPage();
        }
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.triggerScrollTimer);
    if (this.props.$filters) {
      this.unwatchFilters();
    }
  }

  componentDidMount() {
    if (this.props.direction === "left") {
      this.loadPage();
      return;
    }
    if (Array.isArray(this.props.value.include)) {
      if (this.props.value.include.length === 0) {
        this.loadPage();
        return;
      }

      this.loadDataByIds();
    }
    if (this.props.$filters) {
      this.unwatchFilters = this.props.$filters.watch(filters => {
        this.handleFiltersChange(filters);
      });
    }
  }

  addItems = items => {
    const { direction, local } = this.props;
    const { dataSource, page } = this.state;
    if (
      !isLocalDataSource(this.props.value.include, direction, local) &&
      this.props.value.include !== null
    ) {
      return;
    }

    const data = dataSource.concat(items);
    this.setState({
      dataSource: data,
      page: page ? page : 1,
      count: data.length,
      totalPages: Math.ceil(data.length / 100)
    });
  };

  removeItems = (items: string[]) => {
    const { direction, local } = this.props;
    const { dataSource, page } = this.state;
    if (
      !isLocalDataSource(this.props.value.include, direction, local) &&
      this.props.value.include !== null
    ) {
      return;
    }
    const set = new Set(items);
    const data = dataSource.filter(item => !set.has(item.key));
    this.setState({
      dataSource: data,
      page: page ? page : 1,
      count: data.length,
      totalPages: Math.ceil(data.length / 100)
    });
  };

  handleFiltersChange(filters: any) {
    this.setState(
      {
        filters,
        page: 0,
        dataSource: []
      },
      () => {
        this.loadPage();
      }
    );
  }

  loadDataByIds = async () => {
    this.setState({
      loading: true,
      dataSource: []
    });

    const { data } = await this.props.loadDataByIds({
      ids: this.props.value.include
    });

    const state: any = {
      count: data.length,
      totalPages: Math.ceil(data.length / 100),
      dataSource: data,
      loading: false
    };

    this.setState(state);
  };

  loadTreeData = async (treeNode: EventDataNode) => {
    const { dataSource } = this.state;
    const { loadData, value, type } = this.props;
    if (treeNode.children && treeNode.children.length > 0) return;
    const { data } = await loadData({
      type,
      expanded: treeNode.key as string,
      ...value
    });

    const state: any = {
      dataSource: dataSource.concat(data)
    };

    this.setState(state);
  };

  async loadPage(paginationPage = 1) {
    const { loadData, value, type, direction } = this.props;
    let { totalPages, filterValue, filters } = this.state;
    let page = paginationPage ?? 1;

    if (direction === "right" && value.include === null) return;

    if (page !== 1 && page > totalPages) {
      return;
    }

    this.setState({
      loading: true,
      dataSource: []
    });

    const filtersReq = {
      page,
      type,
      search: filterValue,
      ...value,
      ...filters,
      full: direction === "right" ? true : false
    };

    const { data, totalPages: pages, count, expanded } = await loadData(
      filtersReq
    );

    const state: any = {
      page,
      count,
      totalPages: pages,
      dataSource: data,
      loading: false
    };

    if (expanded) state.expandedKeys = expanded;
    this.setState(state);
  }

  getListBody(
    prefixCls: string,
    filterValue: string,
    filteredItems: TransferFilterItem[],
    expandedKeys: string[],
    checkedKeys: string[],
    loading?: boolean,
    showSearch?: boolean,
    disabled?: boolean,
    type?: "tree" | "list"
  ): React.ReactNode {
    const { include, exclude } = this.props.value;
    const isLeftDirection = this.props.direction === "left";

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
      ref: this.bodyRef,
      ...omit(this.props, OmitProps),
      expandedKeys,
      filteredItems,
      loading,
      type,
      disableAll: isLeftDirection && (include === null || include.length > 0),
      disabledKeys: isLeftDirection ? exclude : [],
      enabledKeys: isLeftDirection && include !== null ? include : [],
      selectedKeys: checkedKeys,
      totalItemsCount: this.getTotalCount(filteredItems),
      loadTreeData: this.loadTreeData,
      onPageChange: this.handlePageChange
    });

    let bodyNode: React.ReactNode;

    bodyNode =
      filteredItems.length || loading ? (
        bodyContent
      ) : (
        <div className={`${prefixCls}-body-not-found`}>
          {this.props.noDataText}
        </div>
      );

    const className = classNames(
      `${prefixCls}-body`,
      showSearch && `${prefixCls}-body-with-search`,
      this.props.pagination &&
        type !== "tree" &&
        `${prefixCls}-body-with-pagination`
    );

    return (
      <div className={className}>
        {search}
        {bodyNode}
      </div>
    );
  }

  getFilteredItems(dataSource: TransferFilterItem[]): TransferFilterItem[] {
    const { direction, value, local } = this.props;

    if (isLocalDataSource(value.include, direction, local)) {
      return dataSource.filter(item => this.matchFilter(item));
    }
    if (direction === "right") {
      const set = new Set(value.exclude);
      return dataSource.filter(item => !set.has(item.key));
    }
    return dataSource;
  }

  handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value: filterValue }
    } = e;
    const { direction, value, local } = this.props;
    if (this.bodyRef.current) {
      this.bodyRef.current.resetPage();
    }

    if (isLocalDataSource(value.include, direction, local)) {
      this.setState({ filterValue, page: 1 });
      return;
    }
    this.setState({ filterValue, dataSource: [], page: 0 }, () => {
      this.loadPage();
    });
  };

  handleClear = () => {
    const { direction, value, local } = this.props;
    if (isLocalDataSource(value.include, direction, local)) {
      this.setState({ filterValue: "", page: 1 });
      return;
    }
    this.setState({ filterValue: "", dataSource: [], page: 0 }, () => {
      this.loadPage();
    });
  };

  handlePageChange = (page: number) => {
    const { direction, value, local } = this.props;

    if (isLocalDataSource(value.include, direction, local)) {
      this.setState({ page });
      return;
    }
    this.loadPage(page);
  };

  matchFilter = (item: TransferFilterItem) => {
    const { filterValue } = this.state;
    return item.title.indexOf(filterValue) >= 0;
  };

  getTotalCount(filteredItems: any[]) {
    const { value, direction, local } = this.props;
    const { count } = this.state;

    if (isLocalDataSource(value.include, direction, local))
      return filteredItems.length;
    if (direction === "left") return count;

    if (value.include === null) return 0;
    if (value.include.length === 0) return count;
    return value.include.length;
  }

  renderItem = (item: TransferFilterItem): RenderedItem => {
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
    const { filterValue, dataSource, expandedKeys, loading } = this.state;
    const {
      prefixCls,
      titleText,
      selectedText,
      checkedKeys,
      disabled,
      showSearch,
      actions,
      type
    } = this.props;

    // const totalCount = this.getTotalCount();

    // ====================== Get filtered, checked item list ======================

    const filteredItems = this.getFilteredItems(dataSource);

    // ================================= List Body =================================

    const listBody = this.getListBody(
      prefixCls,
      filterValue,
      filteredItems,
      expandedKeys,
      checkedKeys,
      loading,
      showSearch,
      disabled,
      type
    );

    // ================================ List Footer ================================

    // const checkAllCheckbox = this.getCheckBox(
    //   filteredItems,
    //   onItemSelectAll,
    //   showSelectAll,
    //   disabled
    // );

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
            {/* {checkAllCheckbox} */}
            <span className={`${prefixCls}-header-selected`}>
              {selectedText}: {checkedKeys.length}
            </span>
          </div>

          {/* Body */}
          {listBody}
        </div>
      </div>
    );
  }
}
