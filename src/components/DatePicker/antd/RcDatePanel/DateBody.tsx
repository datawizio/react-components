import * as React from "react";
import type { GenerateConfig } from "rc-picker/lib/generate";
import {
  WEEK_DAY_COUNT,
  isSameMonth,
  formatValue
} from "rc-picker/lib/utils/dateUtil";
import type { Locale } from "rc-picker/lib/interface";
import RangeContext from "rc-picker/lib/RangeContext";
// import useCellClassName from "rc-picker/lib/hooks/useCellClassName";
import PanelBody from "rc-picker/lib/panels/PanelBody";
import { getWeekStartDate, isSameDate } from "../utils/dateUtil";
import useCellClassName from "../RcHooks/useCellClassName";

export type DateRender<DateType> = (
  currentDate: DateType,
  today: DateType
) => React.ReactNode;

export type DateBodyPassProps<DateType> = {
  dateRender?: DateRender<DateType>;
  disabledDate?: (date: DateType) => boolean;

  // Used for week panel
  prefixColumn?: (date: DateType) => React.ReactNode;
  rowClassName?: (date: DateType) => string;
};

export type DateBodyProps<DateType> = {
  prefixCls: string;
  generateConfig: GenerateConfig<DateType>;
  value?: DateType | null;
  viewDate: DateType;
  locale: Locale;
  rowCount: number;
  onSelect: (value: DateType) => void;
} & DateBodyPassProps<DateType>;

function DateBody<DateType>(props: DateBodyProps<DateType>) {
  const {
    prefixCls,
    generateConfig,
    prefixColumn,
    locale,
    rowCount,
    viewDate,
    value,
    dateRender
  } = props;

  const { rangedValue, hoverRangedValue } = React.useContext(RangeContext);
  // console.log(rangedValue);
  const baseDate = getWeekStartDate(locale.locale, generateConfig, viewDate);

  const cellPrefixCls = `${prefixCls}-cell`;
  const weekFirstDay = generateConfig.locale.getWeekFirstDay(locale.locale);
  const today = generateConfig.getNow();

  // ============================== Header ==============================
  const headerCells: React.ReactNode[] = [];
  const weekDaysLocale: string[] =
    locale.shortWeekDays ||
    (generateConfig.locale.getShortWeekDays
      ? generateConfig.locale.getShortWeekDays(locale.locale)
      : []);

  if (prefixColumn) {
    headerCells.push(<th key="empty" aria-label="empty cell" />);
  }
  for (let i = 0; i < WEEK_DAY_COUNT; i += 1) {
    headerCells.push(
      <th key={i}>{weekDaysLocale[(i + weekFirstDay) % WEEK_DAY_COUNT]}</th>
    );
  }

  // =============================== Body ===============================
  const getCellClassName = useCellClassName({
    cellPrefixCls,
    today,
    value,
    generateConfig,
    rangedValue: prefixColumn ? null : rangedValue,
    hoverRangedValue: prefixColumn ? null : hoverRangedValue,
    isSameCell: (current, target) =>
      isSameDate(generateConfig, current, target),
    isInView: date => isSameMonth(generateConfig, date, viewDate),
    offsetCell: (date, offset) => generateConfig.addDate(date, offset)
  });

  const getCellNode = dateRender
    ? (date: DateType) => dateRender(date, today)
    : undefined;

  return (
    <PanelBody
      {...props}
      rowNum={
        //@ts-ignore
        generateConfig.getMonthWeeksCount
          ? //@ts-ignore
            generateConfig.getMonthWeeksCount(baseDate)
          : rowCount
      }
      colNum={WEEK_DAY_COUNT}
      baseDate={baseDate}
      getCellNode={getCellNode}
      getCellText={generateConfig.getDate}
      getCellClassName={getCellClassName}
      getCellDate={generateConfig.addDate}
      titleCell={date =>
        formatValue(date, {
          locale,
          format: "YYYY-MM-DD",
          generateConfig
        })
      }
      headerCells={headerCells}
    />
  );
}

export default DateBody;
