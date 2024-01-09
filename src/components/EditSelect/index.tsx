import React, { useCallback, useState, useRef, useContext } from "react";
import Select from "../Select";
import { Divider } from "antd";
import Input from "../Input";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Button from "../Button";
import ConfigContext from "../ConfigProvider/context";
import "./index.less";

export interface IOption {
  key: string;
  title: string;
}

export interface EditSelectProps {
  placeholder: string;
  inputPlaceholder: string;
  options: IOption[];
  loading?: boolean;
  value?: string;
  onChange?: (promotionTypeKey: string) => void;
  onSave?: (promotionType: IOption) => void;
  onDelete?: (promotionType: IOption) => void;
}

const EditSelect: React.FC<EditSelectProps> = ({
  placeholder,
  inputPlaceholder,
  options,
  loading,
  value,
  onChange,
  onSave,
  onDelete
}) => {
  const { translate: t } = useContext(ConfigContext);

  const TITLE_MAX_LENGTH = 200;

  const [editingOption, setEditingOption] = useState<IOption>({
    key: "new",
    title: ""
  });

  const inputRef = useRef<any>();

  const resetEditingOption = useCallback(() => {
    setEditingOption({
      key: "new",
      title: ""
    });
  }, []);

  const handleDeleteItem = useCallback(
    (promoType: IOption, e: React.MouseEvent) => {
      e.stopPropagation();
      onDelete && onDelete(promoType);
    },
    [onDelete]
  );

  const handleEditItem = useCallback(
    (key: string, title: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setEditingOption({
        key,
        title
      });
      inputRef.current && inputRef.current.focus();
    },
    []
  );

  const handleSaveClick = useCallback(
    async e => {
      if (!editingOption.title.trim()) {
        e.preventDefault();
        return;
      }
      onSave && (await onSave(editingOption));
      resetEditingOption();
    },
    [onSave, editingOption, resetEditingOption]
  );

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const title = e.target.value;
      setEditingOption(option => ({ ...option, title }));
    },
    []
  );

  const dropdownRender = useCallback(
    menu => {
      return (
        <div>
          {menu}
          <Divider />
          <div className="edit-select-dropdown-edit">
            <Input
              value={editingOption.title}
              onChange={handleTitleChange}
              onPressEnter={handleSaveClick}
              placeholder={inputPlaceholder}
              maxLength={TITLE_MAX_LENGTH}
              //@ts-ignore
              ref={inputRef}
            />
            <Button
              type="primary"
              onClick={handleSaveClick}
              disabled={!editingOption.title.trim()}
            >
              {editingOption.key === "new" ? t("ADD") : t("SAVE")}
            </Button>
          </div>
        </div>
      );
    },
    [
      inputPlaceholder,
      t,
      handleTitleChange,
      handleSaveClick,
      editingOption.key,
      editingOption.title
    ]
  );

  return (
    <Select
      dropdownClassName="edit-select-dropdown"
      placeholder={placeholder}
      optionLabelProp="label"
      dropdownRender={dropdownRender}
      loading={loading}
      onChange={onChange}
      value={value ? value : undefined}
      notFoundContent={t("NO_DATA")}
      // onBlur={resetEditingOption}
      // onSelect={handlerRoleTypeChange}
    >
      {options.map(option => (
        <Select.Option
          key={option.key}
          value={option.key}
          label={option.title}
          title={option.title}
        >
          <span className="ant-select-item-option-content-title">
            {option.title}
          </span>
          <EditOutlined
            onClick={handleEditItem.bind(null, option.key, option.title)}
          />
          <DeleteOutlined onClick={handleDeleteItem.bind(null, option)} />
        </Select.Option>
      ))}
    </Select>
  );
};

export default EditSelect;
