import React, { useMemo } from "react";

import { Radio } from "antd";

interface LevelsProps {
  value?: number;
  levels?: number;
  levelText?: string;
  onChange?: (value: number) => void;
}

export const Levels: React.FC<LevelsProps> = ({
  value,
  levels,
  levelText,
  onChange
}) => {
  const arr = useMemo(() => Array(levels).fill(""), [levels]);
  const handleChange = e => {
    onChange(e.target.value);
  };

  return (
    <Radio.Group
      defaultValue={value}
      onChange={handleChange}
      className="drawer-tree-select-levels"
    >
      {arr.map((v, i) => (
        <Radio.Button key={i} value={i + 1}>
          {levelText.replace("%s", (i + 1).toString())}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};

Levels.defaultProps = {
  value: 1,
  levels: 3,
  levelText: "Level %s"
};
