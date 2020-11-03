import React, { useState, useEffect, useCallback, useContext } from "react";
import { Select, DatePicker } from "antd";
import dayjs from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";

import ConfigContext from "../ConfigProvider/context";
import {
  CUSTOM_PERIOD_KEY,
  CUSTOM_PREV_PERIOD_KEY,
  DEFAULT_PERIOD,
  DEFAULT_PREV_PERIOD,
  PERIOD_AVAILABLE,
  PERIOD_OPTIONS,
  PREV_PERIOD_OPTIONS
} from "./constants";
import "./index.less";
import { getDateArrayFromRange, getPeriod, getPrevPeriod } from "./helper";
import {
  DateRangeType,
  IDateConfig,
  PeriodEnum,
  PeriodSelectProps,
  PrevPerionEnum
} from "./types";

dayjs.extend(quarterOfYear);

const { Option } = Select;
const { RangePicker } = DatePicker;

const PeriodSelect = (props: PeriodSelectProps) => {
  const {
    clientDate,
    clientStartDate,
    periodLabel,
    prevPeriodLabel,
    dateConfig
  } = props;

  const { translate } = useContext(ConfigContext);

  const initialDate = {
    startDate: null,
    endDate: null
  };
  const initialSelectedPeriod = dateConfig.selectedPeriod
    ? dateConfig.selectedPeriod
    : DEFAULT_PERIOD;
  const initialSelectedPrevPeriod = dateConfig.selectedPrevPeriod
    ? dateConfig.selectedPrevPeriod
    : DEFAULT_PREV_PERIOD;

  const initialPeriod = dateConfig.datePicker
    ? dateConfig.datePicker
    : initialDate;
  const initialPrevPeriod = dateConfig.prev_datePicker
    ? dateConfig.prev_datePicker
    : initialDate;

  const [selectedPeriod, setSelectedPeriod] = useState<PeriodEnum>(
    initialSelectedPeriod
  );
  const [selectedPrevPeriod, setSelectedPrevPeriod] = useState<PrevPerionEnum>(
    initialSelectedPrevPeriod
  );

  const [period, setPeriod] = useState<DateRangeType>(initialPeriod);
  const [prevPeriod, setPrevPeriod] = useState<DateRangeType>(
    initialPrevPeriod
  );

  const [showPeriodPicker, setShowPeriodPicker] = useState<boolean>(false);
  const [showPrevPeriodPicker, setShowPrevPeriodPicker] = useState<boolean>(
    false
  );
  const [isPickerEmpty, setPickerEmpty] = useState<boolean>(false);
  const [isPrevPickerEmpty, setPrevPickerEmpty] = useState<boolean>(false);

  const [avaliblePrevPeriods, setAvaliblePeriods] = useState(
    PERIOD_AVAILABLE[selectedPeriod]
  );

  useEffect(() => {
    setAvaliblePeriods(PERIOD_AVAILABLE[initialSelectedPeriod]);
    updatePeriod(selectedPeriod, getDateArrayFromRange(period));
    updatePrevPeriod(getDateArrayFromRange(prevPeriod), selectedPrevPeriod);
    console.log("UE []");
  }, []);

  useEffect(() => {
    if (selectedPeriod === CUSTOM_PERIOD_KEY) {
      setShowPeriodPicker(true);
    } else {
      setShowPeriodPicker(false);
      updatePeriod(selectedPeriod);
    }
    console.log("UE [selectedPeriod]");
  }, [selectedPeriod]);

  useEffect(() => {
    if (selectedPrevPeriod === CUSTOM_PREV_PERIOD_KEY) {
      setShowPrevPeriodPicker(true);
    } else if (
      selectedPrevPeriod === DEFAULT_PREV_PERIOD &&
      selectedPeriod === CUSTOM_PERIOD_KEY
    ) {
      setShowPrevPeriodPicker(false);
      updatePrevPeriod(getDateArrayFromRange(period), selectedPrevPeriod);
    } else {
      setShowPrevPeriodPicker(false);
      updatePrevPeriod(selectedPeriod, selectedPrevPeriod);
    }
    console.log("UE [selectedPrevPeriod]");
  }, [selectedPrevPeriod]);

  useEffect(() => {
    if (
      period.startDate &&
      period.endDate &&
      prevPeriod.startDate &&
      prevPeriod.endDate &&
      selectedPeriod &&
      selectedPrevPeriod
    ) {
      props.onChange(formatDataConfig());
    }
    console.log("UE [period, prevPeriod]");
  }, [period, prevPeriod]);

  const formatDataConfig = useCallback((): IDateConfig => {
    return {
      datePicker: period,
      prev_datePicker: prevPeriod,
      selectedPeriod: selectedPeriod,
      selectedPrevPeriod: selectedPrevPeriod
    };
  }, [period, prevPeriod]);

  const handlePeriodChange = periodKey => {
    setAvaliblePeriods(PERIOD_AVAILABLE[periodKey]);
    setSelectedPeriod(periodKey);
    setSelectedPrevPeriod(DEFAULT_PREV_PERIOD);
  };

  const handlePrevPeriodChange = prevPeriodKey => {
    setSelectedPrevPeriod(prevPeriodKey);
  };

  const isDisabledOption = useCallback(
    option => {
      return !avaliblePrevPeriods.includes(option);
    },
    [avaliblePrevPeriods]
  );

  const onDataRangeChange = date => {
    if (date) {
      updatePeriod(CUSTOM_PERIOD_KEY, date);
    } else {
      setPickerEmpty(true);
    }
  };

  const onPrevDataRangeChange = date => {
    if (date) {
      updatePrevPeriod(date, CUSTOM_PREV_PERIOD_KEY);
    } else {
      setPrevPickerEmpty(true);
    }
  };

  const updatePeriod = (periodKey, date = null) => {
    const period = getPeriod({ periodKey, date, clientDate, clientStartDate });
    setPeriod(period);

    if (
      selectedPrevPeriod === DEFAULT_PREV_PERIOD &&
      selectedPeriod === CUSTOM_PERIOD_KEY
    ) {
      updatePrevPeriod(getDateArrayFromRange(period), selectedPrevPeriod);
    } else if (periodKey === "date") {
      updatePrevPeriod(date, CUSTOM_PREV_PERIOD_KEY);
    } else {
      updatePrevPeriod(periodKey);
    }
  };

  const updatePrevPeriod = (date, prev_period = "previous") => {
    const prevPeriod = getPrevPeriod({ date, prev_period, clientDate, period });
    setPrevPeriod(prevPeriod);
  };

  const defaultPickerValue = dateConfig.datePicker
    ? [
        dateConfig.datePicker.startDate
          ? dayjs(dateConfig.datePicker.startDate)
          : null,
        dateConfig.datePicker.endDate
          ? dayjs(dateConfig.datePicker.endDate)
          : null
      ]
    : [null, null];

  const defaultPrevPickerValue = dateConfig.prev_datePicker
    ? [
        dateConfig.prev_datePicker.startDate
          ? dayjs(dateConfig.prev_datePicker.startDate)
          : null,
        dateConfig.prev_datePicker.endDate
          ? dayjs(dateConfig.prev_datePicker.endDate)
          : null
      ]
    : [null, null];

  return (
    <div className="period-picker-wrapper">
      <div className="period-container">
        <span className="period-title">{translate(periodLabel)}</span>
        <Select onChange={handlePeriodChange} value={selectedPeriod}>
          {PERIOD_OPTIONS.map((option, i) => {
            return (
              <Option key={i} value={option}>
                {translate(option)}
              </Option>
            );
          })}
        </Select>
        {showPeriodPicker && (
          <RangePicker
            //@ts-ignore
            defaultValue={!isPickerEmpty && defaultPickerValue}
            onChange={onDataRangeChange}
          />
        )}
      </div>
      <div className="prev-period-container">
        <span className="period-title">{translate(prevPeriodLabel)}</span>

        <Select onChange={handlePrevPeriodChange} value={selectedPrevPeriod}>
          {PREV_PERIOD_OPTIONS.map((option, i) => (
            <Option key={i} disabled={isDisabledOption(option)} value={option}>
              {translate(option)}
            </Option>
          ))}
        </Select>
        {showPrevPeriodPicker && (
          <RangePicker
            //@ts-ignore
            defaultValue={!isPrevPickerEmpty && defaultPrevPickerValue}
            onChange={onPrevDataRangeChange}
          />
        )}
      </div>
    </div>
  );
};

PeriodSelect.defaultProps = {
  clientDate: "2019-10-28",
  clientStartDate: "2018-10-20",
  periodLabel: "SELECT_PERIOD",
  prevPeriodLabel: "SELECT_PREV_PERIOD",
  // dateConfig: {}
  dateConfig: {
    datePicker: {
      startDate: "2015-12-07",
      endDate: "2015-12-08"
    },
    prev_datePicker: {
      startDate: "2015-12-02",
      endDate: "2015-12-03"
    },
    selectedPeriod: "date",
    selectedPrevPeriod: "prev_date"
  }
};

export default PeriodSelect;
