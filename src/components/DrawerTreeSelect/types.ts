import { SelectValue } from "antd/lib/tree-select";

import { TreeSelectProps as AntTreeSelectProps } from "./antd/AntTreeSelect";

import { AntTreeNode } from "antd/lib/tree";

export interface IDrawerTreeSelectFilters {
  search?: string;
  formats?: string[];
  level?: number;
}

export interface FormatRenderProps {
  onChange?: (selected: string[]) => void;
}

export interface DrawerTreeSelectProps<VT>
  extends Omit<AntTreeSelectProps<VT>, "onChange" | "loadData"> {
  asyncData?: boolean;

  /**
   * Ключ для чекбокса `Check all`
   */
  checkAllKey?: string;

  /**
   * Текст для чекбокса `Check all`
   */
  checkAllTitle?: string;

  /**
   * Place holder for search field in drawer
   */
  drawerSearchPlaceholder?: string;

  /**
   * Title Drawerа
   */
  drawerTitle?: string;

  /**
   * Drawer width in px
   */
  drawerWidth?: number;

  /**
   * Показать/не показывать чекбокс `Check all`
   */
  showCheckAll?: boolean;

  /**
   * Показать выбор левелов
   */
  showLevels?: boolean;

  levels?: number;

  level?: number;

  levelText?: string;

  /**
   * Cancel text in drawer
   */
  cancelText?: string;

  /**
   * Submit text in drawer
   */
  submitText?: string;

  loadingText?: string;

  noDataText?: string;

  /**
   * tree data is flat list or not
   */
  isFlatList?: boolean;

  remoteSearch?: boolean;

  formatRender?: ((props: FormatRenderProps) => React.ReactElement) | null;

  loadData?: (filters: IDrawerTreeSelectFilters) => Promise<any>;
  /**
   * Event when user click Submit
   */
  onChange?: (values: SelectValue, selected?: AntTreeNode) => void;
}
