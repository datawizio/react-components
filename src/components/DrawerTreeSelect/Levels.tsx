import React from "react";

import Select from "../Select";

interface LevelsProps {
  value?: string | number;
  levels?: { value: string | number; label: string }[];
  onChange?: (value: string | number) => void;
}

export const Levels: React.FC<LevelsProps> = ({ value, levels, onChange }) => {
  const handleChange = value => {
    onChange(value);
  };

  return (
    <Select
      defaultValue={value}
      value={value}
      options={levels}
      onChange={handleChange}
      className="drawer-tree-select-levels"
    />
  );
};

Levels.defaultProps = {
  value: 1,
  levels: []
};
