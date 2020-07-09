import React, { useContext } from "react";
import { IntervalItem } from "./IntervalItem";
import { IntervalProps } from "../../types";
import { Dayjs } from "dayjs";
import ConfigContext from "../../../ConfigProvider/context";

export const Interval: React.FC<IntervalProps> = ({
  value,
  format,
  onChange
}) => {
  const { translate } = useContext(ConfigContext);

  const handleFromChange = (from: Dayjs) => {
    onChange({ from, to: value ? value.to : null });
  };

  const handleToChange = (to: Dayjs) => {
    onChange({ to, from: value ? value.from : null });
  };
  return (
    <>
      <IntervalItem
        label={translate("FROM")}
        value={value ? value.from : null}
        onChange={handleFromChange}
        format={format}
      />
      <IntervalItem
        label={translate("TO")}
        value={value ? value.to : null}
        onChange={handleToChange}
        format={format}
      />
    </>
  );
};
