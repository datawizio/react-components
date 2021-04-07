export interface DateRangeType {
  startDate: string;
  endDate: string;
}

export interface IDateConfig {
  datePicker: DateRangeType;
  prevDatePicker: DateRangeType;
  selectedPeriod: PeriodEnum;
  selectedPrevPeriod: PrevPerionEnum;
}

export type PeriodEnum =
  | "last_update_date"
  | "penultimate_update_date"
  | "last_7_days"
  | "prev_week"
  | "week_begin"
  | "month_begin"
  | "prev_month"
  | "season_begin"
  | "year_begin"
  | "last_30_days"
  | "last_180_days"
  | "last_365_days"
  | "all_time"
  | "date";

export type PrevPerionEnum =
  | "previous"
  | "prev_last_week"
  | "prev_last_month"
  | "prev_last_quarter"
  | "prev_last_year"
  | "prev_date";

export interface PeriodSelectProps {
  format?: string;
  clientDate?: string;
  clientStartDate?: string;
  periodLabel?: string;
  limitMaxDate?: boolean;
  prevPeriodLabel?: string;
  dateConfig?: IDateConfig;
  onChange?: (dateConfig: IDateConfig) => void;
}
