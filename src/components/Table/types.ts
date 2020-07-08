import { Overwrite } from "utility-types";
import { ColumnProps } from "antd/lib/table";
import { TableProps as AntdTableProps } from "antd/lib/table";

import {
  Key,
  SortOrder,
  SorterResult,
  TableLocale
} from "antd/lib/table/interface";

export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

export type FCTable = {
  ToolBar: React.FC;
} & React.ForwardRefExoticComponent<TableProps & React.RefAttributes<TableRef>>;

/**
 * Table types
 */
type _OverwrittenTableProps<RT> = {
  columns?: Array<IColumn<RT>>;
  dataSource?: DataSourceType;
  locale?: {
    total: string;
  } & TableLocale;
};

export interface TableProps<RT = any>
  extends Overwrite<AntdTableProps<RT>, _OverwrittenTableProps<RT>> {
  width?: string | number;
  height?: string | number;

  searchValue?: string;

  async?: boolean;
  sortable?: boolean;
  showSizeChanger?: boolean;
  multipleSorting?: boolean;
  isResizableColumns?: boolean;

  pageSizeOptions?: Array<string>;
  visibleColumnsKeys?: Array<IColumn["key"]>;

  cellRenderProps?: { [key: string]: any };

  dTypesConfig?: {
    [dType: string]: DTypeConfig;
  };

  columnsConfig?: {
    [columnKey: string]: Partial<IColumn>;
  };

  rowPrefix?: RowPrefix;

  sortHandler?: SorterHandlerType;
  globalHandler?: GlobalHandlerType;
  searchHandler?: SearchHandlerType;
  filterHandler?: FilterHandlerType;

  dataProvider?: DataProvider;
  dataProviderDeps?: (state) => Array<any>;
  rowChildrenProvider?: RowChildrenProviderType;
}

export interface TableState extends Partial<TableProps> {
  sortParams: SortParams;
  filterParams: FilterParams;
  columnsMap: { [key: string]: IColumn };
}

export interface TableRef {
  reload: () => void;
}

export type Action =
  | { type: "expandRow"; payload: IRow }
  | { type: "search"; payload: string }
  | { type: "loading"; payload: boolean }
  | { type: "collapseRow"; payload: IRow }
  | { type: "sort"; payload: SorterResult<any>[] }
  | { type: "update"; payload: Partial<TableState> }
  | { type: "paginate"; payload: TableState["pagination"] }
  | { type: "filter"; payload: Record<string, Key[] | null> }
  | { type: "updateColumns"; payload: TableProps["columns"] }
  | { type: "setRowChildren"; payload: [IRow, IRow["children"]] }
  | { type: "updateDataSource"; payload: TableProps["dataSource"] }
  | { type: "swapColumns"; payload: [IColumn["key"], IColumn["key"]] }
  | { type: "visibleColumnsKeys"; payload: TableState["visibleColumnsKeys"] };

/**
 * DataSource types
 */
export type DataSourceType = Array<IRow>;

/**
 * Column types
 */
type _OverwrittenColumnProps<RT> = {
  children?: Array<IColumn<RT>>;
};

export interface IColumn<RT = any>
  extends Overwrite<ColumnProps<RT>, _OverwrittenColumnProps<RT>>,
    Object {
  dtype?: string;
  dataIndex: string;
  resizable?: boolean;
}

/**
 * row types
 */
export type IRow = {
  [key: string]: BodyCellType;
} & { key: string; children: DataSourceType | undefined };

export type RowPrefix<T = any> = (
  cellVal: T,
  row: IRow,
  column: IColumn,
  index: number
) => React.ReactNode;

/**
 * Cell types
 */
export type BodyCellType = string | number | boolean | CellObjectType;

export type CellObjectType = {
  dtype: string;
  [key: string]: any;
};

/**
 * Data types config
 */
export type DTypeConfig<T = any> = {
  sorter?: (a: T, b: T) => number;
  toString: (cellVal: T) => string;
  search?: (cellVal: T, searchBy: string) => boolean;
  filter?: (cellVal: T, filterBy: string | number | T) => boolean;

  render?: (
    cellVal: T,
    row: IRow,
    column: IColumn,
    index: number,
    renderProps: TableProps["cellRenderProps"]
  ) => React.ReactNode;
};

/**
 * Handlers types
 */
export type HandlerResponse<T = Partial<TableState>> = T | void;

export type GlobalHandlerType = (
  state: TableState
) => HandlerResponse | Promise<HandlerResponse>;

export type SearchHandlerType = (
  columnsMap: TableState["columnsMap"],
  dataSource: TableState["dataSource"],
  searchValue: TableState["searchValue"],
  dTypesConfig: TableState["dTypesConfig"]
) => HandlerResponse;

export type SorterHandlerType = (
  columnsMap: TableState["columnsMap"],
  dataSource: TableState["dataSource"],
  sortParams: SortParams,
  dTypesConfig: TableState["dTypesConfig"]
) => HandlerResponse;

export type FilterHandlerType = (
  columnsMap: TableState["columnsMap"],
  dataSource: TableState["dataSource"],
  searchValue: FilterParams,
  dTypesConfig: TableState["dTypesConfig"]
) => HandlerResponse;

export type FilterParams = Record<string, Key[] | null>;

export type SortParams = {
  [columnKey: string]: SortOrder;
};

/**
 * Providers types
 */

export type DataProvider = (
  state: TableState
) => Partial<TableState> | Promise<Partial<TableState>>;

export type RowChildrenProviderType = (
  expandedRow: IRow
) => IRow["children"] | Promise<IRow["children"]>;
