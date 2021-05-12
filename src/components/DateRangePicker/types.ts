import { Dayjs } from "dayjs";
import DatePicker from "../DatePicker";

export type DateType = string | Dayjs | null;
export type DateRange = [Dayjs, Dayjs];
export type PresetsRangeType = {
  [key: string]: DateRange;
};

export type DateRangePickerProps = {
  dateFrom?: DateType;
  dateTo?: DateType;

  // in case of prev date picker
  currDateRange?: {
    date_from: DateType;
    date_to: DateType;
  };

  maxDate?: DateType;
  minDate?: DateType;
  format?: string;

  ranges?: PresetsRangeType;

  fullWidth?: boolean;
  useDefaultPreset?: boolean;
  presets?: string[];
  defaultPresetExceptions?: string[];
  inputReadOnly?: boolean;
  style?: any;
  onChange?: (a: any, b: any) => void;
  onClear?: () => void;
} & typeof DatePicker.RangePicker;

export type IDateRangePicker = {
  presets: DefaultPresetType;
} & import("react").FC<DateRangePickerProps>;

export type DefaultPresetType = {
  readonly yesterday?: (maxDate?: DateType) => DateRange;
  readonly lastWeek?: (maxDate?: DateType) => DateRange;
  readonly currentMonth?: (maxDate?: DateType) => DateRange;
  readonly last_30_days?: (maxDate?: DateType) => DateRange;
  readonly last_90_days?: (maxDate?: DateType) => DateRange;
  readonly quarterBegin?: (maxDate?: DateType) => DateRange;
  readonly last_180_days?: (maxDate?: DateType) => DateRange;
  readonly last_365_days?: (maxDate?: DateType) => DateRange;
  readonly currentYear?: (maxDate?: DateType) => DateRange;
  readonly allPeriod?: (minDate?: DateType, maxDate?: DateType) => DateRange;
};

export type DefaultPresetPrevType = {
  readonly previous?: (dateFrom: DateType, dateTo: DateType) => DateRange;
  readonly prev_last_week?: (dateFrom: DateType, dateTo: DateType) => DateRange;
  readonly prev_last_month?: (dateFrom: DateType, dateTo: DateType) => DateRange;
  readonly prev_last_quarter?: (dateFrom: DateType, dateTo: DateType) => DateRange;
  readonly prev_last_year?: (dateFrom: DateType, dateTo: DateType) => DateRange;
}
