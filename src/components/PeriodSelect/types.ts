import { CalendarTypes } from "../DatePicker";

export interface DateRangeType {
  startDate: string;
  endDate: string;
}

export interface IDateConfig {
  datePicker: DateRangeType;
  prevDatePicker: DateRangeType;
  selectedPeriod: PeriodEnum;
  selectedPrevPeriod: PrevPeriodEnum;
}

export type PeriodAvailable = {
  [key in PeriodEnum]: Array<PrevPeriodEnum>;
};

export type PeriodAvailableForDates = {
  [key in periodsForDatesEnum]: Array<PrevPeriodEnum>;
};

export type PeriodOption = keyof PeriodAvailable;

export type Period = {
  [key in PeriodEnum]: Array<PrevPeriodEnum>;
};

export type PeriodEnum =
  | "last_update_date"
  | "penultimate_update_date"
  | "last_7_days"
  | "prev_week"
  | "week_begin"
  | "month_begin"
  | "prev_month"
  | "quarter_begin"
  | "prev_quarter"
  | "year_begin"
  | "last_30_days"
  | "last_90_days"
  | "last_180_days"
  | "last_365_days"
  | "prev_year"
  | "all_time"
  | "date";

export type PrevPeriodEnum =
  | "previous"
  | "prev_last_week"
  | "prev_last_month"
  | "prev_last_quarter"
  | "prev_last_year"
  | "same_weekday_prev_year"
  | "prev_date";

export type periodsForDatesEnum =
  | "week"
  | "month"
  | "quarter"
  | "year"
  | "date";

export interface PeriodSelectProps {
  type: CalendarTypes;
  format?: string;
  clientDate?: string;
  clientStartDate?: string;
  periodLabel?: string;
  limitMaxDate?: boolean;
  prevPeriodLabel?: string;
  dateConfig?: IDateConfig;
  onChange?: (dateConfig: IDateConfig) => void;
}
