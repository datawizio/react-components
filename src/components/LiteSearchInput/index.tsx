import * as React from "react";

import { useDebouncedCallback } from "use-debounce";
import { useState, useCallback, useEffect } from "react";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";

import "./index.less";

export interface LiteSearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Задержка вызова onSearch
   */
  debounceDelay?: number;

  /**
   * Вызываеться при нажатии на крестик
   */
  onClear?: () => void;

  /**
   * Работает как OnChange с учётом задержки debounceDelay
   */
  onSearch?: (value: string) => void;
}

const LiteSearchInput: React.FC<LiteSearchInputProps> = props => {
  const {
    style,
    onClear,
    onSearch,
    onChange,
    debounceDelay,
    ...restProps
  } = props;

  const [value, setValue] = useState(() => props.value || "");

  const [onSearchDebounced] = useDebouncedCallback((value: string) => {
    onSearch && onSearch(value);
  }, debounceDelay);

  const handleChange = useCallback(
    event => {
      setValue(event.target.value);
      // run callbacks
      onChange && onChange(event);
      onSearchDebounced(event.target.value);
    },
    [onChange, onSearchDebounced]
  );

  const handleClear = useCallback(() => {
    setValue("");
    onClear && onClear();
    onSearchDebounced("");
  }, [onClear, onSearchDebounced]);

  useEffect(() => {
    setValue(props.value ? props.value : "");
  }, [props.value]);

  return (
    <span className="lite-search" style={style}>
      <SearchOutlined className="lite-search__search-icon" />
      <input
        {...restProps}
        value={value}
        onChange={handleChange}
        className="lite-search__input"
      />
      {value && (
        <CloseOutlined
          onClick={handleClear}
          className="lite-search__cancel-icon"
        />
      )}
    </span>
  );
};

LiteSearchInput.defaultProps = {
  debounceDelay: 0
};

export default LiteSearchInput;
