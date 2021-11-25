import * as React from "react";
import Input from "../../Input";
import { SaveOutlined } from "@ant-design/icons";
import ConfigContext from "../../ConfigProvider/context";
import { useCallback, useState, useContext } from "react";

interface DropdownProps {
  onCreate: (title: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ onCreate, children }) => {
  const { translate } = useContext(ConfigContext);
  const [inputValue, setInputValue] = useState<string>();

  const handleCreateClick = useCallback(
    e => {
      e.stopPropagation();
      if (inputValue.trim()) {
        onCreate(inputValue);
        setInputValue("");
      }
    },
    [onCreate, inputValue]
  );

  return (
    <div className="table-templates__dropdown">
      <div className="table-templates__templates">{children}</div>
      <div className="table-templates__footer">
        <Input
          size="small"
          value={inputValue}
          placeholder={translate("INPUT_TITLE")}
          onChange={e => setInputValue(e.target.value)}
        />
        <SaveOutlined
          onClick={handleCreateClick}
          className="table-templates__icon table-templates__icon--create"
        />
      </div>
    </div>
  );
};

export default Dropdown;
