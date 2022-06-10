import React from "react";
import { SelectProps as AntSelectProps } from "./antd/AntSelect";
import { SelectValue } from "antd/lib/tree-select";
import { AntTreeNode } from "antd/lib/tree";

export interface DrawerSelectProps<VT>
  extends Omit<AntSelectProps<VT>, "onChange"> {
  additionalFilters?: any;
  /**
   * Данные будут загружаться ассинхронно. Будет вызываться функция `loadData`
   */
  asyncData?: boolean;

  hideSearch?: boolean;

  /**
   * Title Drawer-а
   */
  drawerTitle?: string;

  /**
   * Drawer width in px
   */
  drawerWidth?: number;

  /**
   * Label prop
   */
  labelProp?: string;

  /**
   * Функция которая будет вызываться для подгрузки данных с параметрами `searchValue`, `page`
   */
  loadData?: (
    filters: any,
    page: number,
    search: string
  ) => Promise<{ data: any; totalPages: number }>;

  /**
   * Function for customized options
   * */
  optionRender?: (option: any) => any;

  noticeRender?: React.ReactElement | null;

  customFields?: React.ReactElement | null;

  customFieldsHeight?: number;

  multiple?: boolean;

  /**
   * Value prop
   */
  valueProp?: string;

  /**
   * max selected count
   */

  maxSelectedCount?: number;

  maxTagLength?: number;

  /**
   * Подгрузка ассинхронных данных с пагинацией
   */
  withPagination?: boolean;

  /**
   * Event when user clicks Submit
   */
  onChange?: (values: SelectValue, selected?: AntTreeNode) => void;

  onCheckSelectedValue?: (values: SelectValue) => void;

  valueToUncheck?: string | number;

  onLoadData?: (data: any, value: any) => { value?: any };

  onDrawerCancelCallback?: () => void;

  onDrawerSubmitCallback?: () => void;
}