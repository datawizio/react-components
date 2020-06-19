import { Rule } from "antd/lib/form";
import { Dayjs } from "dayjs";

export interface IFormFieldChanged<Type> {
  name: string;
  value: Type;
  selected?: any;
}

export interface FormFieldProps<Type> {
  name: string;
  placeholder?: string;
  label?: string;
  rules?: Rule[];
  initialValue?: any;
  onChange?: (change: IFormFieldChanged<Type>) => void;
}

export interface FieldIntervalProps extends FormFieldProps<IntervalType> {}

export type IntervalType = {
  from: Dayjs | null;
  to: Dayjs | null;
};

export interface IntervalProps {
  value?: IntervalType;
  onChange: (value: IntervalType) => void;
}

export interface IntervalItemProps {
  label: string;
  format?: string;
  value: Dayjs | null;
  onChange: (value: Dayjs) => void;
}

export interface FieldDatePickerProps extends FormFieldProps<Dayjs> {
  format?: string;
}

export interface FieldTextProps extends FormFieldProps<string> {}

export interface FieldCheckboxProps extends FormFieldProps<boolean> {}

export type RadioOptionType = {
  value: string | boolean | number;
  label: string;
};

export interface FieldRadioProps extends FormFieldProps<string> {
  options: RadioOptionType[];
}

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

  showCheckedStrategy?: "SHOW_ALL" | "SHOW_PARENT" | "SHOW_CHILD";
  treeDefaultExpandAll?: boolean;
  loadData?: (filters: any) => Promise<any>;
  loadChildren?: (id: string) => Promise<any>;
  formatRender?: ({ props }: any) => React.ReactElement;
}

export interface FieldImageProps extends FormFieldProps<string> {}

export interface ImageProps {
  t?: any;
  name: string;
  value?: string;
  placeholder?: string;
  onChange: (change: IFormFieldChanged<string>) => void;
}
