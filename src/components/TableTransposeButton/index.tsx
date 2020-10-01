import * as React from "react";
import { useState, useCallback, useContext } from "react";

import Button from "../Button";
import { RetweetOutlined } from "@ant-design/icons";

import "./index.less";
import ConfigContext from "../ConfigProvider/context";
import { TableContext } from "../Table/context";

export interface TableTransposeButtonProps {
  buttonText?: string;
  onTranspose: (isTransposed: boolean) => void;
  resetTableSerch?: boolean;
}

const TableTransposeButton: React.FC<TableTransposeButtonProps> = props => {
  const { onTranspose, buttonText, resetTableSerch } = props;
  const { translate } = useContext(ConfigContext);
  const { dispatch } = useContext(TableContext);
  const [isTransposed, setTransposed] = useState(false);

  const resetSearchValue = () =>
    resetTableSerch && dispatch({ type: "search", payload: "" });

  const handleTranspose = useCallback(() => {
    setTransposed(!isTransposed);
    onTranspose(!isTransposed);
    resetSearchValue();
  }, [isTransposed, onTranspose]);

  return (
    <div className="table-transpose-button table-toolbar--right">
      <Button border={false} onClick={handleTranspose}>
        <RetweetOutlined className="table-transpose-button__icon" />
        {translate(buttonText)}
      </Button>
    </div>
  );
};

TableTransposeButton.defaultProps = {
  buttonText: "TRANSPOSE",
  resetTableSerch: true
};

export default TableTransposeButton;
