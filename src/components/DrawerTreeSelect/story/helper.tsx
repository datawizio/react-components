import React, { useState } from "react";
import Select from "../../Select";

export const Helper = ({ onChange }) => {
  const [options, setOptions] = useState([
    { value: "123", label: "123" },
    {
      value: "1233",
      label: "1233"
    }
  ]);

  React.useEffect(() => {
    setOptions([
      { value: "123", label: "1" },
      {
        value: "1",
        label: "2"
      }
    ]);
  }, []);
  return (
    <Select
      mode="multiple"
      options={options}
      onChange={selected => {
        onChange(selected);
      }}
    />
  );
};
