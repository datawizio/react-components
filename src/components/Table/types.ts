import { Overwrite } from "utility-types";
import { ColumnProps } from "antd/lib/table";
import { Key, SortOrder, SorterResult } from "antd/lib/table/interface";
import { TableProps as AntdTableProps } from "antd/lib/table";

export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

export type FCTable = {
  ToolBar: React.FC;
} & import("react").FC<TableProps>;

/**
 * Table types
 */
type _OverwrittenTableProps<RT> = {
  columns: Array<IColumn<RT>>;
  dataSource: DataSourceType;
};

export interface TableProps<RT = any>
  extends Overwrite<AntdTableProps<RT>, _OverwrittenTableProps<RT>> {
  width?: string | number;
  height?: string | number;
  searchValue?: string;

  sortable?: boolean;
  multipleSorting?: boolean;
  isResizableColumns?: boolean;

  visibleColumnsKeys?: Array<IColumn["key"]>;

  cellRenderProps?: React.HTMLAttributes<any>;

  dTypesConfig?: {
    [dType: string]: DTypeConfig;
  };

  columnsConfig?: {
    [columnKey: string]: Partial<IColumn>;
  };

  sortHandler?: SorterHandlerType;
  globalHandler?: GlobalHandlerType;
  searchHandler?: SearchHandlerType;
  filterHandler?: FilterHandlerType;
  rowChildrenProvider?: RowChildrenProviderType;
}

export interface TableState extends Partial<TableProps> {
  sortParams: SortParams;
  filterParams: FilterParams;
  baseDataSource: TableProps["dataSource"];
}

export type Action =
  | { type: "expandRow"; payload: IRow }
  | { type: "collapseRow"; payload: IRow }
  | { type: "sort"; payload: SorterResult<any>[] }
  | { type: "update"; payload: Partial<TableState> }
  | { type: "paginate"; payload: TableState["pagination"] }
  | { type: "filter"; payload: Record<string, Key[] | null> }
  | { type: "updateColumns"; payload: TableProps["columns"] }
  | { type: "setRowChildren"; payload: [IRow, IRow["children"]] }
  | { type: "updateDataSource"; payload: TableProps["dataSource"] }
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
  dataIndex: string;
  resizable?: boolean;
}

/**
 * row types
 */
export type IRow = {
  [key: string]: BodyCellType;
} & { key: string; children: DataSourceType | undefined };

/**
 * Cell types
 */
export type BodyCellType = string | number | boolean | CellObjectType;

export type CellObjectType = {
  type: string;
  [key: string]: any;
};

/**
 * Data types config
 */
export type DTypeConfig<T = any> = {
  sorter: (a: T, b: T) => number;
  search?: (cellVal: T, searchBy: string) => boolean;
  filter?: (cellVal: T, filterBy: string | number | T) => boolean;

  render?: (
    value: T,
    index: number,
    renderProps: TableProps["cellRenderProps"]
  ) => void;
};

/**
 * Handlers types
 */
export type HandlerResponse<T = Partial<TableState>> = T | void;

export type GlobalHandlerType = (
  state: TableState
) => HandlerResponse | Promise<HandlerResponse>;

export type SearchHandlerType = (
  dataSource: TableProps["dataSource"],
  searchValue: TableProps["searchValue"],
  dTypesConfig: TableProps["dTypesConfig"]
) => HandlerResponse;

export type SorterHandlerType = (
  dataSource: TableProps["dataSource"],
  sortParams: SortParams,
  dTypesConfig: TableProps["dTypesConfig"]
) => HandlerResponse;

export type FilterHandlerType = (
  dataSource: TableProps["dataSource"],
  searchValue: FilterParams,
  dTypesConfig: TableProps["dTypesConfig"]
) => HandlerResponse;

export type FilterParams = Record<string, Key[] | null>;

export type SortParams = {
  [columnKey: string]: SortOrder;
};

/**
 * Providers types
 */

export type RowChildrenProviderType = (
  expandedRow: IRow
) => IRow["children"] | Promise<IRow["children"]>;
