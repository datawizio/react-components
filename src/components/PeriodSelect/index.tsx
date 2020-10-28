import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext
} from "react";
import { Select, DatePicker } from "antd";
import moment from "moment";

import ConfigContext from "../ConfigProvider/context";
import {
  CUSTOM_PERIOD_KEY,
  CUSTOM_PREV_PERIOD_KEY,
  DEFAULT_PERIOD,
  DEFAULT_PREV_PERIOD,
  FORMATTED_PATTERN,
  PERIOD_AVAILABLE,
  PERIOD_OPTIONS,
  PREV_PERIOD_OPTIONS
} from "./constants";
import "./index.less";

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
  onChange?: (dateConfig: IDateConfig) => void;
}

const PeriodSelect = (props: PeriodSelectProps) => {
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

  const { clientDate } = props;

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
    const { clientStartDate } = props;
    const newPeriod = {
      startDate: null,
      endDate: null
    };

    switch (periodKey) {
      case "today":
        newPeriod.startDate = moment(clientDate);
        newPeriod.endDate = moment(clientDate);
        break;
      case "last_day":
        const lastDay = moment(clientDate).subtract(1, "day");
        newPeriod.startDate = lastDay;
        newPeriod.endDate = lastDay;
        break;
      case "last_7_days":
        newPeriod.endDate = moment(clientDate);
        newPeriod.startDate = moment(clientDate).subtract(6, "day");
        break;
      case "prev_week":
        newPeriod.startDate = moment(clientDate)
          .startOf("week")
          .subtract(1, "week");
        newPeriod.endDate = moment(newPeriod.startDate).endOf("week");
        break;
      case "week_begin":
        newPeriod.startDate = moment(clientDate).startOf("week");
        newPeriod.endDate = moment(clientDate);
        break;
      case "month_begin":
        newPeriod.startDate = moment(clientDate).startOf("month");
        newPeriod.endDate = moment(clientDate);
        break;
      case "prev_month":
        const prevMonth = moment(clientDate)
          .startOf("month")
          .subtract(1, "month");

        newPeriod.startDate = prevMonth;
        newPeriod.endDate = moment(newPeriod.startDate).endOf("month");
        break;
      case "season_begin":
        newPeriod.startDate = moment(clientDate).startOf("quarter");
        newPeriod.endDate = moment(clientDate);
        break;
      case "year_begin":
        newPeriod.startDate = moment(clientDate).startOf("year");
        newPeriod.endDate = moment(clientDate);
        break;
      case "last_30_days":
        newPeriod.startDate = moment(clientDate).subtract(29, "day");
        newPeriod.endDate = moment(clientDate);
        break;
      case "last_180_days":
        newPeriod.startDate = moment(clientDate).subtract(179, "day");
        newPeriod.endDate = moment(clientDate);
        break;
      case "last_365_days":
        newPeriod.startDate = moment(clientDate).subtract(364, "day");
        newPeriod.endDate = moment(clientDate);
        break;
      case "all_time":
        let startDate;
        const today = moment().format("YYYY-MM-DD");
        if (clientStartDate > today) {
          startDate = today;
        } else {
          startDate = clientDate;
        }
        console.log(clientStartDate);
        newPeriod.startDate = moment(startDate);
        newPeriod.endDate = moment(clientDate);
        break;
      case "date":
        const [startCustomDate, endCustomDate] = date;

        newPeriod.startDate = startCustomDate;
        newPeriod.endDate = endCustomDate;
        break;
      default:
        break;
    }

    if (
      moment.isMoment(newPeriod.startDate) &&
      moment.isMoment(newPeriod.endDate)
    ) {
      setPeriod({
        startDate: newPeriod.startDate.format(FORMATTED_PATTERN),
        endDate: newPeriod.endDate.format(FORMATTED_PATTERN)
      });
    }

    updatePrevPeriod(periodKey);
  };

  const updatePrevPeriod = (date, prev_period = "previous") => {
    const newPrevPeriod = {
      startDate: null,
      endDate: null
    };

    switch (date) {
      case "today":
        newPrevPeriod.startDate = moment(clientDate).subtract(1, "day");
        newPrevPeriod.endDate = moment(clientDate).subtract(1, "day");
        break;
      case "last_day":
        newPrevPeriod.startDate = moment(clientDate).subtract(2, "day");
        newPrevPeriod.endDate = moment(clientDate).subtract(2, "day");
        break;
      case "last_7_days":
        newPrevPeriod.startDate = moment(clientDate).subtract(13, "day");
        newPrevPeriod.endDate = moment(clientDate).subtract(7, "day");
        break;
      case "prev_week":
        newPrevPeriod.startDate = moment(clientDate)
          .startOf("week")
          .subtract(2, "week");
        newPrevPeriod.endDate = moment(newPrevPeriod.startDate).endOf("week");
        break;
      case "week_begin":
        newPrevPeriod.startDate = moment(clientDate)
          .startOf("week")
          .subtract(1, "week");
        newPrevPeriod.endDate = moment(clientDate).subtract(1, "week");
        break;
      case "month_begin":
        newPrevPeriod.startDate = moment(clientDate)
          .startOf("month")
          .subtract(1, "month");
        newPrevPeriod.endDate = moment(clientDate).subtract(1, "month");
        break;
      case "prev_month":
        newPrevPeriod.startDate = moment(clientDate)
          .startOf("month")
          .subtract(2, "month");
        newPrevPeriod.endDate = moment(newPrevPeriod.startDate).endOf("month");
        break;
      case "season_begin":
        newPrevPeriod.startDate = moment(clientDate)
          .startOf("quarter")
          .subtract(1, "quarter");
        newPrevPeriod.endDate = moment().subtract(1, "quarter");
        break;
      case "year_begin":
        newPrevPeriod.startDate = moment(clientDate)
          .startOf("year")
          .subtract(1, "year");
        newPrevPeriod.endDate = moment(clientDate).subtract(1, "year");
        break;
      case "last_30_days":
        newPrevPeriod.startDate = moment(clientDate).subtract(60, "day");
        newPrevPeriod.endDate = moment(clientDate).subtract(29, "day");
        break;
      case "last_180_days":
        newPrevPeriod.startDate = moment(clientDate).subtract(360, "day");
        newPrevPeriod.endDate = moment(clientDate).subtract(179, "day");
        break;
      case "last_365_days":
        newPrevPeriod.startDate = moment(clientDate).subtract(710, "day");
        newPrevPeriod.endDate = moment(clientDate).subtract(364, "day");
        break;
      default:
        // do nothing
        break;
    }

    switch (prev_period) {
      case "prev_last_week":
        newPrevPeriod.startDate = moment(period.startDate).subtract(1, "week");
        newPrevPeriod.endDate = moment(period.endDate).subtract(1, "week");
        break;
      case "prev_last_month":
        newPrevPeriod.startDate = moment(period.startDate).subtract(1, "month");
        newPrevPeriod.endDate = moment(period.endDate).subtract(1, "month");
        break;
      case "prev_last_quarter":
        newPrevPeriod.startDate = moment(period.startDate).subtract(
          1,
          "quarter"
        );
        newPrevPeriod.endDate = moment(period.endDate).subtract(1, "quarter");
        break;
      case "prev_last_year":
        newPrevPeriod.startDate = moment(period.startDate).subtract(1, "year");
        newPrevPeriod.endDate = moment(period.endDate).subtract(1, "year");
        break;
      case "custom":
        newPrevPeriod.startDate = moment(date[0]);
        newPrevPeriod.endDate = moment(date[1]);
        break;
      default:
        //if selected previous do nothing
        break;
    }

    if (
      moment.isMoment(newPrevPeriod.startDate) &&
      moment.isMoment(newPrevPeriod.endDate)
    ) {
      setPrevPeriod({
        startDate: newPrevPeriod.startDate.format(FORMATTED_PATTERN),
        endDate: newPrevPeriod.endDate.format(FORMATTED_PATTERN)
      });
    }
  };

  return (
    <div className="period-picker-wrapper">
      <div className="period-container">
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
  clientDate: "2015-10-28",
  clientStartDate: "2013-10-28"
};

export default PeriodSelect;
