import { TransferListProps } from "./List";
import { TransferListBodyProps } from "antd/es/transfer/ListBody";

export type LoadDataParams = {
  page?: number;
  pageCount?: number;
  search?: string;
  value?: string[];
};

export type LoadDataResponse = {
  data: TransferItem[];
  totalPages: number;
  count: number;
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

type TransferRender = (item: TransferItem) => RenderResult;

export interface TransferItem {
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

export interface TransferProps {
  prefixCls?: string;
  className?: string;
  disabled?: boolean;
  dataSource: TransferItem[];
  targetKeys?: string[];
  selectedKeys?: string[];
  render?: TransferRender;
  onChange?: (
    targetKeys: string[],
    direction: string,
    moveKeys: string[]
  ) => void;
  onSelectChange?: (
    sourceSelectedKeys: string[],
    targetSelectedKeys: string[]
  ) => void;
  style?: React.CSSProperties;
  listStyle: ((style: ListStyle) => React.CSSProperties) | React.CSSProperties;
  operationStyle?: React.CSSProperties;
  titles?: string[];
  operations?: string[];
  showSearch?: boolean;
  filterOption?: (inputValue: string, item: TransferItem) => boolean;
  locale?: Partial<TransferLocale>;
  footer?: (props: TransferListProps) => React.ReactNode;
  rowKey?: (record: TransferItem) => string;
  onSearch?: (direction: TransferDirection, value: string) => void;
  onScroll?: (
    direction: TransferDirection,
    e: React.SyntheticEvent<HTMLUListElement>
  ) => void;
  children?: (props: TransferListBodyProps<any>) => React.ReactNode;
  showSelectAll?: boolean;
  selectAllLabels?: SelectAllLabel[];
}

export interface TransferLocale {
  titles: string[];
  notFoundContent?: React.ReactNode;
  searchPlaceholder: string;
  itemUnit: string;
  itemsUnit: string;
}
