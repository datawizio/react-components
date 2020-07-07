import React, { useState, useEffect, useRef, useMemo, useContext } from "react";

import Flags from "country-flag-icons/react/3x2";

import countries, { ICountry } from "./helpers/countries";

import {
  parseInput,
  formatNumber,
  isValidPhoneNumber
} from "./helpers/phoneInputHelper";

import Input from "../Input";
import Select from "../Select";

import "./index.less";
import ConfigContext from "../ConfigProvider/context";

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

  const { translate } = useContext(ConfigContext);

  const inputRef = useRef<any>();

  const addInternationalOption = null;
  const international = true;

  const sortedCountries: ICountry[] = useMemo(() => {
    let translated = countries.map(country => ({
      ...country,
      label: translate(country.value)
    }));
    return translated.sort((a, b) => (a.value < b.value ? -1 : 1));
  }, [translate]);

  const handleCountryChange = country => {
    let { value: val, formated } = formatNumber(
      "",
      country,
      country,
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
      true
    );
    const { value, formated } = formatNumber(
      input,
      country,
      defaultCountry,
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
        dropdownClassName="phone-input-select-dropdown"
        value={selectedCountry}
        dropdownMatchSelectWidth={false}
        optionLabelProp="label"
        optionFilterProp="title"
        onChange={handleCountryChange}
        showSearch={true}
      >
        {sortedCountries.map(country => {
          const Flag = Flags[country.value];
          return (
            <Select.Option
              key={country.value}
              value={country.value}
              label={<Flag />}
              title={country.label}
            >
              <Flag /> {country.label}
            </Select.Option>
          );
        })}
      </Select>

      <Input
        //@ts-ignore
        ref={inputRef}
        className="phone-input-input"
        type="tel"
        onChange={handlePhoneChange}
        value={formatedValue}
        placeholder={placeholder}
      />
    </Input.Group>
  );
};

PhoneInput.defaultProps = {
  defaultCountry: "UA"
};

PhoneInput.isValidPhoneNumber = (value: string) => isValidPhoneNumber(value);

export default PhoneInput;
