import { Dayjs } from "dayjs";
import DatePicker, { CalendarTypes } from "../DatePicker";

export type DateType = string | Dayjs | null;
export type DateRange = [Dayjs, Dayjs];
export type PresetsRangeType = {
  [key: string]: DateRange;
};

export type DateRangePickerProps = {
  type?: CalendarTypes;
  dateFrom?: DateType;
  dateTo?: DateType;

  // in case of prev date picker
  currDateRange?: {
    date_from: DateType;
    date_to: DateType;
  };

  maxDateForPresets?: DateType;
  maxDate?: DateType;
  minDate?: DateType;
  format?: string;
  useCurrentDayPreset?: boolean;

  ranges?: PresetsRangeType;

  fullWidth?: boolean;
  useDefaultPreset?: boolean;
  presets?: string[];
  defaultPresetExceptions?: string[];
  inputReadOnly?: boolean;
  style?: any;
  onChange?: (a: any, b: any) => void;
  onClear?: () => void;
  getPopupContainer?: () => HTMLElement | null;
} & typeof DatePicker.RangePicker;

export type IDateRangePicker = {
  presets: DefaultPresetType;
} & import("react").FC<DateRangePickerProps>;

export type DefaultPresetType = {
  readonly current_day?: () => DateRange;
  readonly last_update_date?: (maxDate?: DateType) => DateRange;
  readonly yesterday?: (maxDate?: DateType) => DateRange;
  readonly week_begin?: (maxDate?: DateType, minDate?: DateType) => DateRange;
  readonly lastWeek?: (maxDate?: DateType, minDate?: DateType) => DateRange;
  readonly currentMonth?: (maxDate?: DateType, minDate?: DateType) => DateRange;
  readonly last_30_days?: (maxDate?: DateType, minDate?: DateType) => DateRange;
  readonly last_90_days?: (maxDate?: DateType, minDate?: DateType) => DateRange;
  readonly quarterBegin?: (maxDate?: DateType, minDate?: DateType) => DateRange;
  readonly last_180_days?: (
    maxDate?: DateType,
    minDate?: DateType
  ) => DateRange;
  readonly last_364_days?: (
    maxDate?: DateType,
    minDate?: DateType
  ) => DateRange;
  readonly last_365_days?: (
    maxDate?: DateType,
    minDate?: DateType
  ) => DateRange;
  readonly currentYear?: (maxDate?: DateType, minDate?: DateType) => DateRange;
  readonly allPeriod?: (maxDate?: DateType, minDate?: DateType) => DateRange;
};

export type DefaultPresetPrevType = {
  readonly previous?: (dateFrom: DateType, dateTo: DateType) => DateRange;
  readonly prev_last_week?: (dateFrom: DateType, dateTo: DateType) => DateRange;
  readonly prev_last_month?: (
    dateFrom: DateType,
    dateTo: DateType
  ) => DateRange;
  readonly same_weekday_prev_year?: (
    dateFrom: DateType,
    dateTo: DateType
  ) => DateRange;
  readonly prev_last_quarter?: (
    dateFrom: DateType,
    dateTo: DateType
  ) => DateRange;
  readonly prev_last_year?: (dateFrom: DateType, dateTo: DateType) => DateRange;
};
