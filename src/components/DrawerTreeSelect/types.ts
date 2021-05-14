import { SelectValue } from "antd/lib/tree-select";

import { TreeSelectProps as AntTreeSelectProps } from "./antd/AntTreeSelect";

import { AntTreeNode } from "antd/lib/tree";

export interface IDrawerTreeSelectFilters {
  shop_markers?: string[];
  search?: string;
  level?: string | number;
  value?: SelectValue;
  first?: boolean;
}

export type LevelsType = { value: string; label: string }[];

export interface MarkersRenderProps {
  onChange?: (selected: string[]) => void;
}

export interface DrawerTreeSelectProps<VT>
  extends Omit<AntTreeSelectProps<VT>, "onChange" | "loadData"> {
  additionalFilters?: any;
  asyncData?: boolean;

  headerHeight?: number;

  /**
   * Title Drawer-а
   */
  drawerTitle?: string;

  /**
   * Drawer width in px
   */
  drawerWidth?: number;

  /**
   * Показать выбор левелов
   */
  showLevels?: boolean;

  levels?: LevelsType;

  level?: string | number;

  /**
   * tree data is flat list or not
   */
  isFlatList?: boolean;

  remoteSearch?: boolean;

  showSelectAll?: boolean;

  selectAllText?: string;

  treeDataCount?: number;

  emptyIsAll?: boolean;

  selectedMarkers?: string[];

  markersRender?: ((props: MarkersRenderProps) => React.ReactElement) | null;

  loadData?: (filters: IDrawerTreeSelectFilters) => Promise<any>;

  loadChildren?: (nodeId: string, filters?: any) => Promise<any>;
  /**
   * Event when user click Submit
   */
  onChange?: (values: SelectValue, selected?: AntTreeNode) => void;
  onChangeReturnObject?: (obj: {
    value: SelectValue;
    level: string | number;
    selected?: AntTreeNode;
  }) => void;

  onLevelChange?: (level: string) => void;
}

export interface FCDrawerTreeSelect<VT>
  extends React.FC<DrawerTreeSelectProps<VT>> {
  SHOW_PARENT: "SHOW_PARENT";
  SHOW_ALL: "SHOW_ALL";
  SHOW_CHILD: "SHOW_CHILD";
}
