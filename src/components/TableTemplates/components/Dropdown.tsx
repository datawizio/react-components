import * as React from "react";
import { useCallback, useState, useContext, useMemo, useEffect } from "react";
import { SaveOutlined } from "@ant-design/icons";
import clsx from "clsx";
import Input from "../../Input";
import ConfigContext from "../../ConfigProvider/context";
import { useDeepEqualMemo } from "../../../hooks/useDeepEqualMemo";

interface DropdownProps {
  isOpen: boolean;
  onCreate: (title: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ isOpen, onCreate, children }) => {
  const { translate } = useContext(ConfigContext);
  const [inputValue, setInputValue] = useState<string>();
  const [isInputValueValid, setIsInputValueValid] = useState<boolean>(true);

  useEffect(() => {
    if (!isOpen) setIsInputValueValid(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useDeepEqualMemo(isOpen)]);

  const handleChangeInput = useCallback(e => {
    setIsInputValueValid(Boolean(e.target.value?.trim()));
    setInputValue(e.target.value);
  }, []);

  const handleCreateClick = useCallback(
    e => {
      e.stopPropagation();
      setIsInputValueValid(Boolean(inputValue?.trim()));
      if (inputValue?.trim()) {
        onCreate(inputValue);
        setInputValue("");
      }
    },
    [inputValue, onCreate]
  );
  const className = useMemo(() => clsx({ "error-field": !isInputValueValid }), [
    isInputValueValid
  ]);

  return (
    <div className="table-templates__dropdown">
      <div className="table-templates__templates">{children}</div>
      <div className="table-templates__footer">
        <Input
          size="small"
          value={inputValue}
          className={className}
          placeholder={translate("INPUT_TITLE")}
          onChange={handleChangeInput}
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
