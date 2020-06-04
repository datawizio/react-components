import React, { useState, useEffect, useRef } from "react";

import metadata from "libphonenumber-js/metadata.full.json";

import countries from "./helpers/countries";

import {
  parseInput,
  formatNumber,
  isValidPhoneNumber
} from "./helpers/phoneInputHelper";

import { Input } from "antd";
import Select from "../Select";

import "./index.less";

export interface PhoneInputProps {
  /**
   * placeholder
   */
  placeholder?: string;
  defaultCountry?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export interface FCPhoneInput extends React.FC<PhoneInputProps> {
  /**
   * PhoneNumber validation
   */
  isValidPhoneNumber: (value?: string) => boolean;
}

const PhoneInput: FCPhoneInput = ({
  defaultCountry,
  placeholder,
  value,
  onChange
}) => {
  const [internalValue, setInternalValue] = useState<string>();
  const [formatedValue, setFormatedValue] = useState<string>();
  const [selectedCountry, setSelectedCountry] = useState<string>("UA");

  const inputRef = useRef<Input>();

  const addInternationalOption = null;
  const international = true;

  const handleCountryChange = country => {
    let { value: val, formated } = formatNumber(
      "",
      country,
      country,
      metadata,
      international
    );
    if (!formated && val) formated = val;

    setSelectedCountry(country);
    setInternalValue(val);
    setFormatedValue(formated);

    if (inputRef.current) inputRef.current.focus();
  };

  const handlePhoneChange = e => {
    const { input, country } = parseInput(
      e.target.value,
      internalValue,
      selectedCountry,
      defaultCountry,
      null,
      addInternationalOption,
      true,
      metadata
    );
    const { value, formated } = formatNumber(
      input,
      country,
      defaultCountry,
      metadata,
      international
    );

    setInternalValue(value);
    setFormatedValue(formated);
    setSelectedCountry(country);
    onChange(value);
  };

  useEffect(() => {
    if (internalValue === value) return;
    let { value: val, formated, country } = formatNumber(
      value,
      selectedCountry,
      defaultCountry,
      metadata,
      international
    );
    if (!formated && val) formated = val;
    setInternalValue(val);
    setFormatedValue(formated);
    setSelectedCountry(country);
    //eslint-disable-next-line
  }, [defaultCountry, value]);

  return (
    <Input.Group compact className="phone-input">
      <Select
        className="phone-input-select"
        value={selectedCountry}
        dropdownMatchSelectWidth={false}
        optionLabelProp="label"
        optionFilterProp="title"
        onChange={handleCountryChange}
        showSearch={true}
      >
        {countries.map(country => (
          <Select.Option
            key={country.value}
            value={country.value}
            label={country.emoji}
            title={country.label}
          >
            {country.emoji} {country.label}
          </Select.Option>
        ))}
      </Select>

      <Input
        ref={inputRef}
        className="phone-input-input"
        type="tel"
        onChange={handlePhoneChange}
        value={formatedValue}
        placeholder={placeholder}
      />
    </Input.Group>
  );

  // return <ReactPhoneInput {...restProps} value={value} onChange={onChange} />;
};

PhoneInput.defaultProps = {
  defaultCountry: "UA"
};

PhoneInput.isValidPhoneNumber = (value: string) =>
  isValidPhoneNumber(value, metadata);

export default PhoneInput;
