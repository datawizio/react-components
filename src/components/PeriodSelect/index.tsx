import React, { useEffect, useCallback, useContext, useRef } from "react";
import { Select } from "antd";
import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import ConfigContext from "../ConfigProvider/context";
import {
  DEFAULT_PERIOD,
  PERIOD_OPTIONS,
  PREV_PERIOD_OPTIONS
} from "./constants";
import {
  actionCreator,
  isEmptyPeriod,
  formatDateConfig,
  getAvailablePrevPeriod,
  getInitialDateConfig
} from "./helper";
import { PeriodSelectProps } from "./types";
import { usePeriodSelect } from "./usePeriodSelect";
import { DateRangePicker } from "../..";
import "./index.less";

dayjs.extend(quarterOfYear);

const { Option } = Select;

const PeriodSelect = (props: PeriodSelectProps) => {
  const { translate } = useContext(ConfigContext);

  const {
    type,
    clientDate,
    clientStartDate,
    periodLabel,
    prevPeriodLabel,
    limitMaxDate,
    dateConfig,
    format,
    onChange,
    allowEmptyEndDate,
    datePickerPlaceholder
  } = props;

  const {
    initialSelectedPeriod,
    isCustomPeriod,
    initialSelectedPrevPeriod,
    isCustomPrevPeriod,
    initialPeriod,
    initialPrevPeriod,
    defaultPickerValue,
    defaultPrevPickerValue
  } = getInitialDateConfig(dateConfig);

  const [state, dispatch] = usePeriodSelect({
    availablePrevPeriods: getAvailablePrevPeriod(initialSelectedPeriod, type),
    clientDate,
    clientStartDate,
    isPickerEmpty: false,
    isPrevPickerEmpty: false,
    showPeriodPicker: isCustomPeriod,
    showPrevPeriodPicker: isCustomPrevPeriod,
    period: initialPeriod,
    calendarType: type,
    prevPeriod: initialPrevPeriod,
    selectedPeriod: initialSelectedPeriod,
    selectedPrevPeriod: initialSelectedPrevPeriod
  });

  const {
    availablePrevPeriods,
    isPickerEmpty,
    isPrevPickerEmpty,
    showPeriodPicker,
    showPrevPeriodPicker,
    period,
    prevPeriod,
    selectedPeriod,
    selectedPrevPeriod
  } = state;

  const startDate = period.startDate && dayjs(period.startDate);
  const endDate = period.endDate && dayjs(period.endDate);

  const startDateRef = useRef(startDate);
  const endDateRef = useRef(endDate);

  useEffect(() => {
    startDateRef.current = startDate;
  }, [startDate]);

  useEffect(() => {
    endDateRef.current = endDate;
  }, [endDate]);

  useEffect(() => {
    if (startDate?.isAfter(dayjs(clientDate)) && !endDate) {
      return;
    }

    if (isEmptyPeriod(period)) {
      actionCreator(dispatch, "updatePeriod", {
        periodKey: DEFAULT_PERIOD
      });
    } else {
      onChange(formatDateConfig(state));
    }
    // eslint-disable-next-line
  }, [period, prevPeriod]);

  const handlePeriodChange = periodKey => {
    actionCreator(dispatch, "updatePeriod", {
      periodKey
    });
  };

  const handlePrevPeriodChange = prevPeriodKey => {
    actionCreator(dispatch, "updatePrevPeriod", {
      prevPeriodKey
    });
  };

  const onDateRangeChange = date => {
    actionCreator(dispatch, "updateDatePicker", {
      date
    });
  };

  const onDateRangeClear = () => {
    actionCreator(dispatch, "clearPicker");
  };

  const onPrevDateRangeChange = date => {
    actionCreator(dispatch, "updatePrevDatePicker", { date });
  };

  const onPrevDateRangeClear = () => {
    actionCreator(dispatch, "clearPrevPicker");
  };

  const isDisabledOption = useCallback(
    option => {
      return !availablePrevPeriods.includes(option);
    },
    [availablePrevPeriods]
  );

  const isDisabledPrevSelect = !availablePrevPeriods.length;

  const dateRangePickerPlaceholder =
    typeof datePickerPlaceholder === "function"
      ? datePickerPlaceholder({ isPickerEmpty, startDate, endDate })
      : datePickerPlaceholder;

  return (
    <div className="period-picker-wrapper">
      <div className="period-container">
        <span className="period-title">{translate(periodLabel)}</span>
        <Select onChange={handlePeriodChange} value={selectedPeriod}>
          {PERIOD_OPTIONS.map((option, i) => {
            return (
              <Option key={i} value={option}>
                {translate(
                  option === "date" ? "SET_DATE" : option.toUpperCase()
                )}
              </Option>
            );
          })}
        </Select>
        {showPeriodPicker && (
          <DateRangePicker
            placeholder={dateRangePickerPlaceholder}
            inputReadOnly={false}
            type={type}
            dateFrom={!isPickerEmpty && startDate}
            dateTo={!isPickerEmpty && endDate}
            minDate={dayjs(clientStartDate)}
            maxDate={limitMaxDate && dayjs(clientDate)}
            // @ts-ignore
            defaultValue={!isPickerEmpty && defaultPickerValue}
            onChange={onDateRangeChange}
            onClear={onDateRangeClear}
            defaultPickerValue={[
              !isPickerEmpty ? startDate : dayjs(clientDate),
              !isPickerEmpty ? endDate : dayjs(clientDate)
            ]}
            format={format}
            allowEmpty={[false, allowEmptyEndDate]}
            onOpenChange={(open: boolean) => {
              setTimeout(() => {
                if (
                  !open &&
                  startDateRef.current?.isAfter(dayjs(clientDate)) &&
                  !endDateRef.current
                ) {
                  actionCreator(dispatch, "clearPicker");
                }
              }, 0);
            }}
          />
        )}
      </div>
      <div className="prev-period-container">
        <span className="period-title">{translate(prevPeriodLabel)}</span>

        <Select
          onChange={handlePrevPeriodChange}
          disabled={isDisabledPrevSelect}
          value={selectedPrevPeriod}
        >
          {PREV_PERIOD_OPTIONS.map((option, i) => (
            <Option key={i} disabled={isDisabledOption(option)} value={option}>
              {translate(
                option === "prev_date" ? "SET_DATE" : option.toUpperCase()
              )}
            </Option>
          ))}
        </Select>
        {showPrevPeriodPicker && (
          <DateRangePicker
            inputReadOnly={false}
            type={type}
            dateFrom={!isPrevPickerEmpty && dayjs(prevPeriod.startDate)}
            dateTo={!isPrevPickerEmpty && dayjs(prevPeriod.endDate)}
            minDate={dayjs(clientStartDate)}
            maxDate={limitMaxDate && dayjs(clientDate)}
            // @ts-ignore
            defaultValue={!isPrevPickerEmpty && defaultPrevPickerValue}
            onChange={onPrevDateRangeChange}
            onClear={onPrevDateRangeClear}
            defaultPickerValue={[
              !isPrevPickerEmpty
                ? dayjs(prevPeriod.startDate)
                : dayjs(clientDate),
              !isPrevPickerEmpty ? dayjs(prevPeriod.endDate) : dayjs(clientDate)
            ]}
            format={format}
          />
        )}
      </div>
    </div>
  );
};

PeriodSelect.defaultProps = {
  clientDate: "2021-11-28",
  clientStartDate: "2020-10-21",
  periodLabel: "SELECT_PERIOD",
  prevPeriodLabel: "SELECT_PREV_PERIOD",
  dateConfig: {},
  limitMaxDate: false,
  type: "iso-8601"
};

export default PeriodSelect;
