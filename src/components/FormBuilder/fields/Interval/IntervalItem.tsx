import React, { useContext } from "react";
import { IntervalItemProps } from "../../types";
import DatePicker from "../../../DatePicker";
import ConfigContext from "../../../ConfigProvider/context";

export const IntervalItem: React.FC<IntervalItemProps> = ({
  label,
  value,
  format,
  onChange
}) => {
  const { translate } = useContext(ConfigContext);
  return (
    <>
      <div className="field-interval-label">{label}:</div>
      <DatePicker
        picker="month"
        placeholder={translate("UNLIMITED")}
        value={value}
        //@ts-ignore
        onChange={onChange}
        format={format}
      />
    </>
  );
};
