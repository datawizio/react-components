import { Dayjs } from "dayjs";
import DatePicker from "../DatePicker";

export type DateType = string | Dayjs;
export type DateRange = [Dayjs, Dayjs];
export type PresetsRangeType = {
  [key: string]: DateRange;
};

export type DateRangePickerProps = {
  dateFrom?: DateType;
  dateTo?: DateType;

  maxDate?: DateType;
  minDate?: DateType;
  format?: string;

  ranges: PresetsRangeType;

  fullWidth?: boolean;
  defaultPresetUsed?: boolean;
  inputReadOnly?: boolean;
  onChange?: (a: any, b: any) => void;

  /**
   * Клик по крестику
   */
  onClear?: () => void;
} & typeof DatePicker.RangePicker;

export type IDateRangePicker = {
  presets: DefaultPresetType;
} & import("react").FC<DateRangePickerProps>;

export type DefaultPresetType = {
  readonly yesterday: DateRange;
  readonly lastWeek: DateRange;
  readonly currentMonth: DateRange;
  readonly last_30_days: DateRange;
  readonly last_90_days: DateRange;
  readonly currentYear: DateRange;
};
