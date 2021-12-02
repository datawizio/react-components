import * as React from "react";
import LiteSearchInput from "../LiteSearchInput";

import { useContext } from "react";
import { TableContext } from "../Table/context";

import "./index.less";

export interface TableSearchProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

const TableSearch: React.FC<TableSearchProps> = ({ placeholder, onSearch }) => {
  const {
    dispatch,
    tableState: { searchValue },
    tableProps: { async }
  } = useContext(TableContext);

  const onSearchHandler = value => {
    if (async) {
      onSearch && onSearch(value);
      dispatch({ type: "search", payload: value });
    } else {
      dispatch({ type: "loading", payload: true });
      setTimeout(() => {
        onSearch && onSearch(value);
        dispatch({ type: "search", payload: value });
        dispatch({ type: "loading", payload: false });
      });
    }
  };

  return (
    <div className="table-search table-toolbar--left">
      <LiteSearchInput
        value={searchValue}
        debounceDelay={1000}
        placeholder={placeholder}
        style={{ width: "230px" }}
        onSearch={value => onSearchHandler(value)}
      />
    </div>
  );
};

export default TableSearch;
