export type DraggableGridProps = {
  className: string;
  cols: number;
  rowHeight: 400;
  onLayoutChange: (items: IDragableItem[]) => void;
};

export type DraggableGridState = {
  items: IDragableItemConfig[];
  newCounter: number;
};

export type IDragableItem = {
  config: IDragableItemConfig;
  component: React.ReactNode;
};

export type IDragableItemConfig = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
  static?: boolean;
  isBounded?: boolean;
  isDraggable?: boolean;
  isResizable?: boolean;
  resizeHandles?: () => void;
};
