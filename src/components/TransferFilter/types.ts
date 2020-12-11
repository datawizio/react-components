import { PaginationType } from "antd/es/transfer/interface";

export type TransferFilterValue = {
  exclude: Array<string>;
  include: Array<string> | null;
};

export interface ICheckedItem {
  key: string;
  title: string;
}
export type TransferFilterLoadDataByIdsParams = {
  ids: string[];
};

export type TransferFilterLoadDataByIdsResponse = {
  data: TransferFilterItem[];
};

export type TransferFilterLoadDataParams = {
  type: "tree" | "list";
  expanded?: string;
  page?: number;
  full?: boolean;
  pageCount?: number;
  search?: string;
  value?: Array<string>;
  lastLevel?: boolean;
  exclude: Array<string>;
  include: Array<string> | null;
};

export type TransferFilterLoadDataResponse = {
  data: TransferFilterItem[];
  totalPages: number;
  count: number;
  expanded?: string[] | null;
};

export type TransferDirection = "left" | "right";

export interface RenderResultObject {
  label: React.ReactElement;
  value: string;
}

export type RenderResult =
  | React.ReactElement
  | RenderResultObject
  | string
  | null;

export interface TransferFilterItem {
  key: string;
  title?: string;
  description?: string;
  disabled?: boolean;
  [name: string]: any;
}

export interface ListStyle {
  direction: TransferDirection;
}

export type SelectAllLabel =
  | React.ReactNode
  | ((info: { selectedCount: number; totalCount: number }) => React.ReactNode);

export interface TransferFilterProps {
  value: TransferFilterValue;
  type: "tree" | "list";
  local?: boolean;
  prefixCls?: string;
  className?: string;
  disabled?: boolean;
  targetKeys?: string[];
  selectedKeys?: string[];
  operationDisabled?: boolean;
  onChange?: (value: TransferFilterValue) => void;
  onSelectChange?: (
    sourceSelectedKeys: string[],
    targetSelectedKeys: string[]
  ) => void;
  style?: React.CSSProperties;

  sourceTitle?: string;
  loadData?: (
    params: TransferFilterLoadDataParams,
    part: string
  ) => Promise<TransferFilterLoadDataResponse>;
  loadDataByIds?: (
    params: TransferFilterLoadDataByIdsParams
  ) => Promise<TransferFilterLoadDataByIdsResponse>;
  sourceFilters?: any;
  sourceActions?: React.ReactElement;
  targetTitle?: string;
  targetFilters?: any;
  targetActions?: React.ReactElement;
  tooltips?: { throwAll: string; throwChosen: string };

  pagination?: PaginationType;
}

export interface TransferLocale {
  titles: string[];
  notFoundContent?: React.ReactNode;
  searchPlaceholder: string;
  itemUnit: string;
  itemsUnit: string;
}
