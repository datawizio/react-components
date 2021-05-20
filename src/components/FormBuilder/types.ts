import { Rule } from "antd/lib/form";
import { Dayjs } from "dayjs";

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
  onChange?: (change: IFormFieldChanged<Type>) => void;
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
}

export interface FieldTextProps extends FormFieldProps<string> {}

export interface FieldCheckboxProps extends FormFieldProps<boolean> {}

export type RadioOptionType = {
  value: any;
  label: string;
};

export interface FieldRadioProps extends FormFieldProps<string> {
  options: RadioOptionType[];
}

export interface FieldSelectProps extends FormFieldProps<string> {
  options: RadioOptionType[];
  mode?: "multiple" | "tags";
  showSearch?: boolean;
  allowClear?: boolean;
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

  multiple?: boolean;
  options?: any;
  loading?: boolean;
  loadData?: (
    search: string,
    page: number
  ) => Promise<{ data: [any]; totalPages: number }>;
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
  showSelectAll?: boolean;
  showCheckAll?: boolean;
  isFlatList?: boolean;
  remoteSearch?: boolean;
  emptyIsAll?: boolean;
  level?: string | number;
  value?: string[] | number[];

  showCheckedStrategy?: "SHOW_ALL" | "SHOW_PARENT" | "SHOW_CHILD";
  treeDefaultExpandAll?: boolean;
  loadData?: (filters: any) => Promise<any>;
  loadChildren?: (id: string) => Promise<any>;
  markersRender?: ({ props }: any) => React.ReactElement;
  selectedMarkers?: string[];

  onDrawerCloseCallback?: () => void;
  onDrawerOpenCallback?: () => void;
  onDrawerSubmitCallback?: () => void;
}

export interface FieldImageProps extends FormFieldProps<string> {}

export interface ImageProps {
  t?: any;
  name: string | string[];
  value?: string;
  placeholder?: string;
  onChange: (change: IFormFieldChanged<string>) => void;
}
