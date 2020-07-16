import * as React from "react";
import LiteSearchInput from "../LiteSearchInput";

import { useContext } from "react";
import { TableContext } from "../Table/context";

import "./index.less";

export interface TableSearchProps {
  placeholder?: string;
}

const TableSearch: React.FC<TableSearchProps> = ({ placeholder }) => {
  const {
    dispatch,
    tableState: { searchValue }
  } = useContext(TableContext);

  return (
    <div className="table-search table-toolbar--left">
      <LiteSearchInput
        value={searchValue}
        debounceDelay={1000}
        placeholder={placeholder}
        style={{ width: "230px" }}
        onSearch={value => dispatch({ type: "search", payload: value })}
      />
    </div>
  );
};

export default TableSearch;
