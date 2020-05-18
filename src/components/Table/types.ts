import { Overwrite } from "utility-types";
import { ColumnProps } from "antd/lib/table";
import { CompareFn } from "antd/lib/table/interface";
import { TableProps as AntdTableProps } from "antd/lib/table";

type _OverwrittenTableProps<RT> = {
  columns: Array<IColumn<RT>>;
};

export interface TableProps<RT = any>
  extends Overwrite<AntdTableProps<RT>, _OverwrittenTableProps<RT>> {
  width?: string | number;
  height?: string | number;

  sortable?: boolean;
  multipleSorting?: boolean;
  resizableColumns?: boolean;
  defaultSorter?: TColumnSorter<RT>;

  columnsConfig?: {
    [key: string]: Partial<IColumn>;
  };
}

type _OverwrittenColumnProps<RT> = {
  children?: Array<IColumn<RT>>;
};

export interface IColumn<RT = any>
  extends Overwrite<ColumnProps<RT>, _OverwrittenColumnProps<RT>>,
    Object {
  dataIndex: string;
  resizable?: boolean;
  dType: TColumnDataTypes;
  sorter: TColumnSorter<RT>;
}

export type TColumnDataTypes = "String" | "Number" | "Boolean" | "Object";

export type TColumnSorter<RT> =
  | boolean
  | CompareFn<RT>
  | TMultipleSorterComparer<RT>;

export type TMultipleSorterComparer<RT> = {
  compare: CompareFn<RT>;
  /** Config multiple sorter order priority */
  multiple: number;
};
