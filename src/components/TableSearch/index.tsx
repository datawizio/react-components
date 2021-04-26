import * as React from "react";
import LiteSearchInput from "../LiteSearchInput";

import { useContext } from "react";
import { TableContext } from "../Table/context";

import "./index.less";

export interface TableSearchProps {
  placeholder?: string;
  onSearch?: () => void;
}

const TableSearch: React.FC<TableSearchProps> = ({ placeholder, onSearch }) => {
  const {
    dispatch,
    tableState: { searchValue }
  } = useContext(TableContext);
  const onSearchHandler = (value) => {
    onSearch && onSearch();
    dispatch({ type: "search", payload: value });
  }
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
