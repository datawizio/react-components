import * as React from "react";
import { useState, useCallback, useContext } from "react";

import Button from "../Button";
import { RetweetOutlined } from "@ant-design/icons";

import "./index.less";
import ConfigContext from "../ConfigProvider/context";

export interface TableTransposeButtonProps {
  buttonText?: string;
  onTranspose: (isTransposed: boolean) => void;
}

const TableTransposeButton: React.FC<TableTransposeButtonProps> = props => {
  const { onTranspose, buttonText } = props;
  const { translate } = useContext(ConfigContext);
  const [isTransposed, setTransposed] = useState(false);

  const handleTranspose = useCallback(() => {
    setTransposed(!isTransposed);
    onTranspose(!isTransposed);
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
  buttonText: "TRANSPOSE"
};

export default TableTransposeButton;
