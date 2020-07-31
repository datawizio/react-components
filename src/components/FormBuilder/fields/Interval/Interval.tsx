import React, { useContext, useState } from "react";
import { IntervalItem } from "./IntervalItem";
import { IntervalProps } from "../../types";
import { Dayjs } from "dayjs";
import ConfigContext from "../../../ConfigProvider/context";

export const Interval: React.FC<IntervalProps> = ({
  value,
  format,
  onChange,
  minDate,
  maxDate,
  picker
}) => {
  const [dateTo, setDateTo] = useState<Dayjs>();
  const [dateFrom, setDateFrom] = useState<Dayjs>();

  const { translate } = useContext(ConfigContext);

  const handleFromChange = (from: Dayjs) => {
    setDateFrom(from);
    onChange({ from, to: value ? value.to : null });
  };

  const handleToChange = (to: Dayjs) => {
    setDateTo(to);
    onChange({ to, from: value ? value.from : null });
  };
  return (
    <>
      <IntervalItem
        minDate={minDate}
        maxDate={dateTo || maxDate}
        picker={picker}
        label={translate("FROM")}
        value={value ? value.from : null}
        onChange={handleFromChange}
        format={format}
      />
      <IntervalItem
        picker={picker}
        format={format}
        label={translate("TO")}
        onChange={handleToChange}
        minDate={dateFrom || minDate}
        value={value ? value.to : null}
      />
    </>
  );
};
