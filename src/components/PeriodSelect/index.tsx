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
import { DatePicker } from "../..";
import "./index.less";

dayjs.extend(quarterOfYear);

const { Option } = Select;
const { RangePicker } = DatePicker;

const PeriodSelect = (props: PeriodSelectProps) => {
  const { translate } = useContext(ConfigContext);

  const {
    clientDate,
    clientStartDate,
    periodLabel,
    prevPeriodLabel,
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

  const onDataRangeChange = date => {
    if (date) {
      actionCreator(dispatch, "updateDatePicker", {
        date
      });
    } else {
      actionCreator(dispatch, "clearPicker");
    }
  };

  const onPrevDataRangeChange = date => {
    if (date) {
      actionCreator(dispatch, "updatePrevDatePicker", { date });
    } else {
      actionCreator(dispatch, "clearPrevPicker");
    }
  };

  const isDisabledOption = useCallback(
    option => {
      return !availablePrevPeriods.includes(option);
    },
    [availablePrevPeriods]
  );

  const disabledDates = current => {
    if (current < dayjs(clientStartDate)) {
      return true;
    } else if (current > dayjs(clientDate)) {
      return true;
    }
    return false;
  };

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
          <RangePicker
            //@ts-ignore
            defaultValue={!isPickerEmpty && defaultPickerValue}
            onChange={onDataRangeChange}
            disabledDate={disabledDates}
            defaultPickerValue={[dayjs(clientDate), dayjs(clientDate)] as any}
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
          <RangePicker
            //@ts-ignore
            defaultValue={!isPrevPickerEmpty && defaultPrevPickerValue}
            onChange={onPrevDataRangeChange}
            disabledDate={disabledDates}
            defaultPickerValue={[dayjs(clientDate), dayjs(clientDate)] as any}
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
  dateConfig: {}
};

export default PeriodSelect;
