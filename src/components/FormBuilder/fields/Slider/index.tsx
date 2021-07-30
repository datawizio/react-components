import React, { useState } from "react";
import { InputNumber, Slider, Form } from "antd";
import { FieldSliderProps } from "../../types";
import "./styles.less";

export const FieldSlider: React.FC<FieldSliderProps> = React.memo(
  ({ name, label, initialValue, min, max, step, onChange }) => {
    const [inputValue, setInputValue] = useState(initialValue);

    const handleChange = value => {
      setInputValue(value);
      onChange({
        name,
        value
      });
    };

    return (
      <Form.Item
        name={name}
        label={label}
        initialValue={initialValue}
        className="dw-slider"
      >
        <InputNumber
          min={min}
          max={max}
          step={step || 1}
          value={inputValue}
          className="dw-slider-input"
          onChange={handleChange}
        />
        <Slider
          min={min}
          max={max}
          step={step || 1}
          value={inputValue}
          className="dw-slider-interval"
          onChange={handleChange}
        />
      </Form.Item>
    );
  }
);
