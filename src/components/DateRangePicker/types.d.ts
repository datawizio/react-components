import { Moment } from "moment";

export type DateType = string | Moment;
export type DateRange = [Moment, Moment];

export type DateRangePickerProps = {
  dateFrom?: DateType;
  dateTo?: DateType;

  maxDate?: DateType;
  minDate?: DateType;

  /**
   * Клик по крестику
   */
  onClear?: () => void;
} & import("antd/lib/date-picker").RangePickerProps;

export type IDateRangePicker = {
  presets: BasicPresetsType;
} & import("react").FC<DateRangePickerProps>;

export type BasicPresetsType = {
  readonly yesterday: DateRange;
  readonly lastWeek: DateRange;
  readonly currentMonth: DateRange;
  readonly last_30_days: DateRange;
  readonly last_90_days: DateRange;
  readonly currentYear: DateRange;
};
