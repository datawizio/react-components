import * as React from "react";
import { useState, useCallback } from "react";

import Button from "../Button";
import { RetweetOutlined } from "@ant-design/icons";

import "./index.less";

export interface TableTransposeButtonProps {
  buttonText?: string;
  onTranspose: (isTransposed: boolean) => void;
}

const TableTransposeButton: React.FC<TableTransposeButtonProps> = props => {
  const { onTranspose, buttonText } = props;
  const [isTransposed, setTransposed] = useState(false);

  const handleTranspose = useCallback(() => {
    setTransposed(!isTransposed);
    onTranspose(!isTransposed);
  }, [isTransposed, onTranspose]);

  return (
    <div className="table-transpose-button table-toolbar--right">
      <Button border={false} onClick={handleTranspose}>
        <RetweetOutlined className="table-transpose-button__icon" />
        {buttonText}
      </Button>
    </div>
  );
};

TableTransposeButton.defaultProps = {
  buttonText: "Transpose"
};

export default TableTransposeButton;
