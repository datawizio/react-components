import React, { useMemo } from "react";

// import { Radio } from "antd";
import Select from "../Select";

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
  const options = useMemo(
    () =>
      Array(levels)
        .fill("")
        .map((v, index) => ({
          value: index + 1,
          label: levelText.replace("%s", (index + 1).toString())
        })),
    [levels, levelText]
  );
  const handleChange = e => {
    onChange(e.target.value);
  };

  return (
    <Select
      defaultValue={value}
      options={options}
      onChange={handleChange}
      className="drawer-tree-select-levels"
    />

    // <div>
    //   Level:
    //   <Radio.Group
    //     defaultValue={value}
    //     onChange={handleChange}
    //     className="drawer-tree-select-levels"
    //   >
    //     {arr.map((v, i) => (
    //       <Radio.Button key={i} value={i + 1}>
    //         {i + 1}
    //       </Radio.Button>
    //     ))}
    //   </Radio.Group>
    // </div>
  );
};

Levels.defaultProps = {
  value: 2,
  levels: 3,
  levelText: "Level %s"
};
