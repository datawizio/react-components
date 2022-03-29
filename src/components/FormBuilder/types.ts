import { Rule } from "antd/lib/form";
import { Dayjs } from "dayjs";
import { CalendarTypes } from "../DatePicker";

export interface IFormFieldChanged<Type> {
  name: string | string[];
  value: Type;
  selected?: any;
}

export interface FormFieldProps<Type> {
  name: string | string[];
  placeholder?: string;
  label?: string;
  rules?: Rule[];
  initialValue?: any;
  disabled?: boolean;
  onChange?: (change: IFormFieldChanged<Type>) => void;
  onDeselect?: (param: string | number) => void;
}

export interface FieldIntervalProps extends FormFieldProps<IntervalType> {
  picker?: string;
  format?: string;
  minDate?: Dayjs;
  maxDate?: Dayjs;
}

export type IntervalType = {
  from: Dayjs | null;
  to: Dayjs | null;
};

export interface IntervalProps {
  picker?: string;
  format?: string;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  value?: IntervalType;
  onChange: (value: IntervalType) => void;
}

export interface IntervalItemProps {
  label: string;
  picker?: string;
  format?: string;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  value: Dayjs | null;
  onChange: (value: Dayjs) => void;
}

export interface FieldDatePickerProps extends FormFieldProps<Dayjs> {
  format?: string;
  fullWidth?: boolean;
  inputReadOnly?: boolean;
  type?: CalendarTypes;
  disabledDate?: (currentDate: Dayjs) => boolean;
}

export interface FieldTextProps extends FormFieldProps<string> {
  type?: string;
}

export interface FieldCheckboxProps extends FormFieldProps<boolean> {}

export type RadioOptionType = {
  value: any;
  label: string;
  disabled?: boolean;
};

export interface FieldRadioProps extends FormFieldProps<string> {
  options: RadioOptionType[];
}

export interface FieldSelectProps extends FormFieldProps<string> {
  options: RadioOptionType[];
  mode?: "multiple" | "tags";
  showSearch?: boolean;
  allowClear?: boolean;
  notFoundContent?: string;
  getPopupContainer?: () => HTMLElement | null;
}

export interface FieldSliderProps extends FormFieldProps<string | number> {
  min: number;
  max: number;
  step?: number;
}

export type EnableSelectValueType = {
  enabled: boolean;
  value: any;
};

export interface FieldEnableSelectProps
  extends FormFieldProps<EnableSelectValueType> {}

export interface FieldPhoneProps extends FormFieldProps<string> {}

export interface FieldDrawerSelectProps
  extends FormFieldProps<string | string[]> {
  additionalFilters?: any;
  allowClear?: boolean;
  multiple?: boolean;
  options?: any;
  loading?: boolean;
  maxSelectedCount?: number;
  maxTagLength?: number;
  onCheckSelectedValue?: (value: any) => void;
  valueToUncheck?: string | number;
  loadData?: (
    search: string,
    page: number
  ) => Promise<{ data: [any]; totalPages: number }>;
  onLoadData?: (data: any, value: any) => { value?: any };
}
export interface FieldDrawerTreeSelectProps extends FormFieldProps<string> {
  additionalFilters?: any;
  treeData?: any;
  headerHeight?: number;
  drawerTitle?: string;
  multiple?: boolean;
  treeDataSimpleMode?: boolean;
  treeDataCount?: number;
  loading?: boolean;
  showLevels?: boolean;
  markersRender?: ({ props }: any) => React.ReactElement;
  showMarkers?: boolean;
  markersTree?: any;
  showSelectAll?: boolean;
  showCheckAll?: boolean;
  isFlatList?: boolean;
  remoteSearch?: boolean;
  emptyIsAll?: boolean;
  level?: string | number;
  value?: string[] | number[];
  allowClear?: boolean;
  maxSelected?: number;
  maxTagLength?: number;

  showCheckedStrategy?: "SHOW_ALL" | "SHOW_PARENT" | "SHOW_CHILD";
  treeDefaultExpandAll?: boolean;
  treeNodeFilterProp?: string;
  loadData?: (filters: any) => Promise<any>;
  loadChildren?: (id: string) => Promise<any>;
  loadMarkersChildren?: (id: string, filters?: any) => Promise<any>;
  selectedMarkers?: string[] | number[];

  dependentItems?: Array<any>;
  onCheckedDependentValue?: (
    checkedValue: string,
    selectedItems: Array<string>
  ) => void;
  onDrawerCloseCallback?: (payload?: any) => void;
  onDrawerCancelCallback?: (payload?: any) => void;
  onDrawerOpenCallback?: (payload?: any) => void;
  onDrawerSubmitCallback?: (payload?: any) => void;
}

export interface FieldImageProps extends FormFieldProps<string> {}

export interface ImageProps {
  t?: any;
  name: string | string[];
  value?: string;
  placeholder?: string;
  onChange: (change: IFormFieldChanged<string>) => void;
}
