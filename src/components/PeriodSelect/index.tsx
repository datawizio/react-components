import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext
} from "react";
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
import { getPeriod, getPrevPeriod } from "./helper";

dayjs.extend(quarterOfYear);

const { Option } = Select;
const { RangePicker } = DatePicker;

export interface DateRangeType {
  startDate: string;
  endDate: string;
}

export interface IDateConfig {
  datePicker: DateRangeType;
  prev_datePicker: DateRangeType;
  selectedPeriod: string;
  selectedPrevPeriod: string;
}

export interface PeriodSelectProps {
  clientDate?: string;
  clientStartDate?: string;
  periodLabel?: string;
  prevPeriodLabel?: string;
  onChange?: (dateConfig: IDateConfig) => void;
}

const PeriodSelect = (props: PeriodSelectProps) => {
  const { clientDate, clientStartDate, periodLabel, prevPeriodLabel } = props;
  const { translate } = useContext(ConfigContext);

  const [selectedPeriod, setSelectedPeriod] = useState<string>(DEFAULT_PERIOD);
  const [selectedPrevPeriod, setSelectedPrevPeriod] = useState<string>(
    DEFAULT_PREV_PERIOD
  );

  const [period, setPeriod] = useState<DateRangeType>({
    startDate: null,
    endDate: null
  });
  const [prevPeriod, setPrevPeriod] = useState<DateRangeType>({
    startDate: null,
    endDate: null
  });

  const [showPeriodPicker, setShowPeriodPicker] = useState<boolean>(false);
  const [showPrevPeriodPicker, setShowPrevPeriodPicker] = useState<boolean>(
    false
  );
  const [avaliblePrevPeriods, setAvaliblePeriods] = useState(
    PERIOD_AVAILABLE[selectedPeriod]
  );

  useEffect(() => {
    setAvaliblePeriods(PERIOD_AVAILABLE[DEFAULT_PERIOD]);
    updatePeriod(selectedPeriod);
  }, []);

  useEffect(() => {
    if (
      period.startDate &&
      period.endDate &&
      prevPeriod.startDate &&
      prevPeriod.endDate
    ) {
      props.onChange(formatDataConfig);
    }
  }, [period, prevPeriod]);

  const formatDataConfig = useMemo((): IDateConfig => {
    return {
      datePicker: period,
      prev_datePicker: prevPeriod,
      selectedPeriod: selectedPeriod,
      selectedPrevPeriod: selectedPrevPeriod
    };
  }, [period, prevPeriod, selectedPeriod, selectedPrevPeriod]);

  const handlePeriodChange = periodKey => {
    setAvaliblePeriods(PERIOD_AVAILABLE[periodKey]);
    setSelectedPeriod(periodKey);
    setSelectedPrevPeriod(DEFAULT_PREV_PERIOD);

    if (periodKey === CUSTOM_PERIOD_KEY) {
      setShowPeriodPicker(true);
    } else {
      setShowPeriodPicker(false);
      updatePeriod(periodKey);
    }
  };

  const handlePrevPeriodChange = prevPeriodKey => {
    setSelectedPrevPeriod(prevPeriodKey);
    if (prevPeriodKey === CUSTOM_PREV_PERIOD_KEY) {
      setShowPrevPeriodPicker(true);
    } else {
      setShowPrevPeriodPicker(false);
      updatePrevPeriod(selectedPeriod, prevPeriodKey);
    }
  };

  const isDisabledOption = useCallback(
    option => {
      return !avaliblePrevPeriods.includes(option);
    },
    [avaliblePrevPeriods]
  );

  const onDataRangeChange = date => {
    updatePeriod(CUSTOM_PERIOD_KEY, date);
  };

  const onPrevDataRangeChange = date => {
    updatePrevPeriod(date, "custom");
  };

  const updatePeriod = (periodKey, date = null) => {
    const period = getPeriod({ periodKey, date, clientDate, clientStartDate });

    setPeriod(period);
    if (periodKey === "date") {
      updatePrevPeriod(date, periodKey);
    } else {
      updatePrevPeriod(periodKey);
    }
  };

  const updatePrevPeriod = (date, prev_period = "previous") => {
    const prevPeriod = getPrevPeriod({ date, prev_period, clientDate, period });
    setPrevPeriod(prevPeriod);
  };

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
        {showPeriodPicker && <RangePicker onChange={onDataRangeChange} />}
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
          <RangePicker onChange={onPrevDataRangeChange} />
        )}
      </div>
    </div>
  );
};

PeriodSelect.defaultProps = {
  clientDate: "2019-10-28",
  clientStartDate: "2018-10-20",
  periodLabel: "SELECT_PERIOD",
  prevPeriodLabel: "SELECT_PREV_PERIOD"
};

export default PeriodSelect;
