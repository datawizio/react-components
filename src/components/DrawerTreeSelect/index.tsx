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
import clsx from "clsx";
import { AntTreeNode } from "antd/lib/tree";
import { triggerInputChangeValue } from "../../utils/trigger";

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
   * tree data is flat list or not
   */
  isFlatList?: boolean;

  formatRender?: ((props: any) => React.ReactElement) | null;

  loadData?: (filters: any) => Promise<any>;
  asyncData?: boolean;
  remoteSearch?: boolean;

  /**
   * Event when user click Submit
   */
  onChange?: (values: SelectValue, selected?: AntTreeNode) => void;
}

const DrawerTreeSelect: React.FC<DrawerTreeSelectProps<SelectValue>> = ({
  asyncData,
  showCheckAll,
  checkAllTitle,
  checkAllKey,
  drawerTitle,
  drawerSearchPlaceholder,
  drawerWidth,
  formatRender,
  treeDefaultExpandedKeys,
  treeExpandedKeys,
  treeData,
  cancelText,
  submitText,
  value,
  isFlatList,
  onChange,
  loadData,
  multiple,
  remoteSearch,
  ...restProps
}) => {
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [, setSearchValue] = useState<string>("");
  const [internalValue, setInternalValue] = useState<SelectValue>(value);
  const [selected, setSelected] = useState<AntTreeNode>();
  const [stateTreeData, setStateTreeData] = useState(treeData);

  const formatSelected = useRef<string[]>();
  const searchValue = useRef<string>();

  const [internalTreeExpandedKeys, setInternalTreeExpandedKeys] = useState<
    Key[]
  >([]);
  const inputRef = useRef<HTMLInputElement>();

  const internalTreeDefaultExpandedKeys = useMemo(() => {
    if (searchValue.current) return undefined;
    if (internalTreeExpandedKeys.length > 0) return internalTreeExpandedKeys;

    return treeDefaultExpandedKeys.concat([checkAllKey]);
  }, [
    treeDefaultExpandedKeys,
    checkAllKey,
    searchValue,
    internalTreeExpandedKeys
  ]);

  const internalTreeData: DataNode[] = useMemo(() => {
    return showCheckAll
      ? [
          {
            key: checkAllKey,
            title: checkAllTitle,
            value: checkAllKey,
            children: stateTreeData,
            className: "tree-check-all"
          }
        ]
      : stateTreeData;
  }, [stateTreeData, checkAllKey, checkAllTitle, showCheckAll]);

  // ----- METHODS -------

  const setInputRef = (el: HTMLInputElement) => {
    if (el.classList.contains("ant-select-selection-search-input")) {
      inputRef.current = el;
    }
  };

  const triggerOnChange = useCallback(
    value => {
      if (!onChange) return;
      if (!multiple) {
        if (value[0]) return onChange(value[0], selected);
        return onChange("");
      }
      onChange(value);
    },
    [multiple, selected, onChange]
  );

  const internalLoadData = useCallback(async () => {
    const filters = {
      search: searchValue.current,
      format: formatSelected.current
    };
    const data = await loadData(filters);
    setStateTreeData(data);
  }, [loadData]);

  //  -------- HANDLERS --------
  const closeDrawer = useCallback(() => {
    setTimeout(() => {
      const activeElement = document.activeElement as HTMLElement;
      activeElement.blur();
    }, 100);

    searchValue.current = "";
    setDrawerVisible(false);

    // setSearchValue("");
    setInternalTreeExpandedKeys([]);
  }, []);

  const handlerDrawerCancel = useCallback(() => {
    closeDrawer();
    setInternalValue(value);
  }, [closeDrawer, value]);

  const handlerDrawerSubmit = useCallback(() => {
    closeDrawer();
    triggerOnChange(internalValue);
  }, [triggerOnChange, closeDrawer, internalValue]);

  const handlerDrawerFocus = e => {
    setInputRef(e.target);
    setDrawerVisible(true);
    triggerInputChangeValue(inputRef.current, searchValue.current);
  };

  const handlerSearchInputChange = useCallback(
    e => {
      const inputValue = e.target.value;

      searchValue.current = inputValue;
      setSearchValue(inputValue);
      triggerInputChangeValue(inputRef.current, inputValue);
    },
    [inputRef]
  );

  const handlerSelectBeforeBlur = useCallback(() => !drawerVisible, [
    drawerVisible
  ]);

  const handleTreeSelect = useCallback(
    (_, node) => {
      setSelected(node);
    },
    [setSelected]
  );

  const handleTreeSelectChange = useCallback(
    (value, labels, el) => {
      if (multiple) {
        setInternalValue(value);
      } else {
        setInternalValue(el.checked ? [el.triggerValue] : []);
      }
      if (!drawerVisible) {
        triggerOnChange(value);
      }
    },
    [drawerVisible, triggerOnChange, multiple]
  );

  const handlerTreeExpand = useCallback(expandedKeys => {
    setInternalTreeExpandedKeys(expandedKeys);
  }, []);

  // ---- EFFECTS ------

  useEffect(() => {
    if (!multiple && !value) value = [];
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    setStateTreeData(treeData);
  }, [treeData]);

  useEffect(() => {
    !asyncData && loadData && internalLoadData();
    //eslint-disable-next-line
  }, [asyncData, loadData]);

  // -------- RENDERS ---------

  const format = useMemo(() => {
    if (!formatRender) return null;

    return formatRender({
      onChange: (selected: string[]) => {
        formatSelected.current = selected;
        internalLoadData();
      }
    });
  }, [formatRender, internalLoadData]);

  const dropdownRender = useCallback(
    menu => (
      <Drawer
        className={clsx({
          "drawer-tree-select-dropdown": true,
          "drawer-tree-select-dropdown-show-all": showCheckAll,
          "drawer-tree-select-dropdown-flat-list": isFlatList
        })}
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
        {format}
        <SearchInput
          placeholder={drawerSearchPlaceholder}
          value={searchValue.current}
          onChange={handlerSearchInputChange}
        />
        {menu}
      </Drawer>
    ),
    //eslint-disable-next-line
    [
      drawerVisible,
      searchValue,
      handlerDrawerCancel,
      handlerDrawerSubmit,
      handlerSearchInputChange
    ]
  );

  const listHeight =
    window.innerHeight - 205 - (formatRender === null ? 0 : 44);

  return (
    <AntTreeSelect
      {...restProps}
      value={internalValue}
      className="drawer-tree-select"
      treeData={internalTreeData}
      treeExpandedKeys={internalTreeDefaultExpandedKeys}
      searchValue={searchValue.current ? searchValue.current : ""}
      //@ts-ignore
      dropdownRender={dropdownRender}
      dropdownClassName="drawer-tree-select-dropdown-fake"
      multiple={multiple}
      showSearch={true}
      listHeight={listHeight}
      onBeforeBlur={handlerSelectBeforeBlur}
      onChange={handleTreeSelectChange}
      onFocus={handlerDrawerFocus}
      onTreeExpand={handlerTreeExpand}
      onSelect={handleTreeSelect}
    />
  );
};

DrawerTreeSelect.defaultProps = {
  maxTagCount: 10,
  treeDefaultExpandedKeys: [],
  showCheckAll: false,
  isFlatList: false,
  checkAllTitle: "Check all",
  checkAllKey: "-1",
  drawerTitle: "",
  drawerSearchPlaceholder: "Search",
  drawerWidth: 400,
  cancelText: "Cancel",
  submitText: "Submit",
  formatRender: null,
  remoteSearch: false
};

export default DrawerTreeSelect;
