import React, { useEffect, useCallback, useContext } from "react";
import { Select } from "antd";
import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";

import ConfigContext from "../ConfigProvider/context";
import {
  DEFAULT_PERIOD,
  PERIOD_AVAILABLE,
  PERIOD_OPTIONS,
  PREV_PERIOD_OPTIONS
} from "./constants";
import {
  actionCreator,
  checkIsEmptyPeriod,
  formatDateConfig,
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
    onChange
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
    availablePrevPeriods: PERIOD_AVAILABLE[initialSelectedPeriod],
    clientDate,
    clientStartDate,
    isPickerEmpty: false,
    isPrevPickerEmpty: false,
    showPeriodPicker: isCustomPeriod,
    showPrevPeriodPicker: isCustomPrevPeriod,
    period: initialPeriod,
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

  useEffect(() => {
    if (!checkIsEmptyPeriod(period)) {
      actionCreator(dispatch, "updatePeriod", {
        periodKey: DEFAULT_PERIOD
      });
    } else {
      onChange(formatDateConfig(state));
    }
    //eslint-disable-next-line
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
            inputReadOnly={false}
            type={type}
            dateFrom={!isPickerEmpty && dayjs(period.startDate)}
            dateTo={!isPickerEmpty && dayjs(period.endDate)}
            minDate={dayjs(clientStartDate)}
            maxDate={limitMaxDate && dayjs(clientDate)}
            //@ts-ignore
            defaultValue={!isPickerEmpty && defaultPickerValue}
            onChange={onDateRangeChange}
            onClear={onDateRangeClear}
            defaultPickerValue={
              [
                !isPickerEmpty ? dayjs(period.startDate) : dayjs(clientDate),
                !isPickerEmpty ? dayjs(period.endDate) : dayjs(clientDate)
              ] as any
            }
            format={format}
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
              {translate(option.toUpperCase())}
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
            //@ts-ignore
            defaultValue={!isPrevPickerEmpty && defaultPrevPickerValue}
            onChange={onPrevDateRangeChange}
            onClear={onPrevDateRangeClear}
            defaultPickerValue={
              [
                !isPrevPickerEmpty
                  ? dayjs(prevPeriod.startDate)
                  : dayjs(clientDate),
                !isPrevPickerEmpty
                  ? dayjs(prevPeriod.endDate)
                  : dayjs(clientDate)
              ] as any
            }
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
