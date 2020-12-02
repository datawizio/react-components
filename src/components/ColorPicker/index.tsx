import React from "react";
import { Popover } from "antd";
import { SketchPicker, ColorResult } from "react-color";

import "./index.less";

export interface ColorPickerProps {
  value?: string;
  onChange?: (value: string) => void;
  defaultColors?: string[];
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  defaultColors,
  value,
  onChange
}) => {
  const handleChange = (val: ColorResult) => {
    onChange && onChange(val.hex);
  };
  return (
    <Popover
      trigger="click"
      overlayClassName="color-picker-popover"
      content={
        <SketchPicker
          color={value ?? "#FFF"}
          presetColors={defaultColors}
          disableAlpha
          onChange={handleChange}
        />
      }
    >
      <div className="color-picker" style={{ background: value }}></div>
    </Popover>
  );
};

export default ColorPicker;
