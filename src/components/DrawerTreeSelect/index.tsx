import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect
} from "react";

import AntTreeSelect, {
  TreeSelectProps as AntTreeSelectProps
} from "./AntTreeSelect";
import { SelectValue } from "antd/lib/tree-select";
import { DataNode, Key } from "rc-tree-select/es/interface";

import SearchInput from "../SearchInput";
import Drawer from "../Drawer";
import Button from "../Button";

import "./index.less";

export interface DrawerTreeSelectProps<VT>
  extends Omit<AntTreeSelectProps<VT>, "onChange"> {
  /**
   * Показать/не показывать чекбокс `Check all`
   */
  showCheckAll?: boolean;

  /**
   * Текст для чекбокса `Check all`
   */
  checkAllTitle?: string;

  /**
   * Ключ для чекбокса `Check all`
   */
  checkAllKey?: string;

  /**
   * Title Drawerа
   */
  drawerTitle?: string;

  /**
   * Place holder for search field in drawer
   */
  drawerSearchPlaceholder?: string;

  /**
   * Drawer width in px
   */
  drawerWidth?: number;

  /**
   * Cancel text in drawer
   */
  cancelText?: string;

  /**
   * Submit text in drawer
   */
  submitText?: string;

  /**
   * Event when user click Submit
   */
  onChange?: (values: SelectValue) => void;
}

const triggerInputChangeValue = (input: HTMLInputElement, value: string) => {
  var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  ).set;
  nativeInputValueSetter.call(input, value);

  input.dispatchEvent(new Event("input", { "bubbles": true }));
};

const DrawerTreeSelect: React.FC<DrawerTreeSelectProps<
  SelectValue
>> = props => {
  const {
    showCheckAll,
    checkAllTitle,
    checkAllKey,
    drawerTitle,
    drawerSearchPlaceholder,
    drawerWidth,
    treeDefaultExpandedKeys,
    treeExpandedKeys,
    treeData,
    cancelText,
    submitText,
    value,
    onChange,
    ...restProps
  } = props;

  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [internalValue, setInternalValue] = useState<SelectValue>(value);

  const [internalTreeExpandedKeys, setInternalTreeExpandedKeys] = useState<
    Key[]
  >([]);
  const inputRef = useRef<HTMLInputElement>();

  const internalTreeDefaultExpandedKeys = useMemo(() => {
    if (searchValue) return undefined;
    if (internalTreeExpandedKeys.length > 0) return internalTreeExpandedKeys;
    if (!showCheckAll) return treeDefaultExpandedKeys;

    return treeDefaultExpandedKeys.concat([checkAllKey]);
  }, [
    treeDefaultExpandedKeys,
    showCheckAll,
    checkAllKey,
    searchValue,
    internalTreeExpandedKeys
  ]);

  const internalTreeData: DataNode[] = useMemo(() => {
    if (!showCheckAll) return treeData;
    return [
      {
        key: checkAllKey,
        title: checkAllTitle,
        children: treeData,
        className: "tree-check-all"
      }
    ];
  }, [treeData, checkAllKey, checkAllTitle, showCheckAll]);

  const setInputRef = (el: HTMLInputElement) => {
    if (el.classList.contains("ant-select-selection-search-input")) {
      inputRef.current = el;
    }
  };

  useEffect(() => {
    setInternalValue(value);
    return () => {};
  }, [value]);

  //  -------- HANDLERS --------
  const closeDrawer = useCallback(() => {
    setTimeout(() => {
      const activeElement = document.activeElement as HTMLElement;
      activeElement.blur();
    }, 100);

    setDrawerVisible(false);
    setSearchValue("");
    setInternalTreeExpandedKeys([]);
  }, []);

  const handlerDrawerCancel = useCallback(() => {
    closeDrawer();
    setInternalValue(value);
  }, [closeDrawer, value]);

  const handlerDrawerSubmit = useCallback(() => {
    closeDrawer();
    onChange && onChange(internalValue);
  }, [onChange, closeDrawer, internalValue]);

  const handlerDrawerFocus = e => {
    setInputRef(e.target);
    setDrawerVisible(true);
    triggerInputChangeValue(inputRef.current, searchValue);
  };

  const handlerSearchInputChange = e => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
    triggerInputChangeValue(inputRef.current, inputValue);
  };

  const handlerSelectBeforeBlur = useCallback(() => !drawerVisible, [
    drawerVisible
  ]);

  const handleTreeSelectChange = useCallback(
    value => {
      setInternalValue(value);
      if (!drawerVisible) {
        onChange && onChange(value);
      }
    },
    [drawerVisible, onChange]
  );

  const handlerTreeExpand = useCallback(expandedKeys => {
    setInternalTreeExpandedKeys(expandedKeys);
  }, []);

  // -------- RENDERS ---------
  const dropdownRender = menu => (
    <Drawer
      className="drawer-tree-select-dropdown"
      title={drawerTitle ? drawerTitle : restProps.placeholder}
      onClose={handlerDrawerCancel}
      visible={drawerVisible}
      width={drawerWidth}
      actions={
        <>
          <Button onClick={handlerDrawerCancel}>{cancelText}</Button>
          <Button onClick={handlerDrawerSubmit} type="primary">
            {submitText}
          </Button>
        </>
      }
    >
      <SearchInput
        placeholder={drawerSearchPlaceholder}
        value={searchValue}
        onChange={handlerSearchInputChange}
      />
      {menu}
    </Drawer>
  );

  return (
    <AntTreeSelect
      {...restProps}
      value={internalValue}
      className="drawer-tree-select"
      treeData={internalTreeData}
      treeExpandedKeys={internalTreeDefaultExpandedKeys}
      searchValue={searchValue ? searchValue : drawerVisible ? "1" : ""}
      //@ts-ignore
      dropdownRender={dropdownRender}
      dropdownClassName="drawer-tree-select-dropdown-fake"
      showSearch={true}
      listHeight={window.innerHeight - 205}
      onBeforeBlur={handlerSelectBeforeBlur}
      onChange={handleTreeSelectChange}
      onFocus={handlerDrawerFocus}
      onTreeExpand={handlerTreeExpand}
    />
  );
};

DrawerTreeSelect.defaultProps = {
  maxTagCount: 10,
  treeDefaultExpandedKeys: [],
  showCheckAll: false,
  checkAllTitle: "Check all",
  checkAllKey: "-1",
  drawerTitle: "",
  drawerSearchPlaceholder: "Search",
  drawerWidth: 300,
  cancelText: "Cancel",
  submitText: "Submit"
};

export default DrawerTreeSelect;
