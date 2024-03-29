import {
  DownOutlined,
  SendOutlined,
  VerticalAlignBottomOutlined
} from "@ant-design/icons";
import { Dropdown, Menu, message } from "antd";
import React, { useCallback, useContext, useMemo } from "react";
import Button, { ButtonProps } from "../Button";
import Checkbox from "../Checkbox";
import ConfigContext from "../ConfigProvider/context";
import { TableContext } from "../Table/context";
import { TableState } from "../Table/types";
import { saveAs } from "file-saver";

import "./index.less";

export interface TableMenuProps extends ButtonProps {
  filename?: string;
  getFilename?: () => string;
  menuItems?: any;
  config?: any;
  duration?: number;
  exportHandler?: (
    tableState: TableState | null,
    filename: string
  ) => Promise<BlobPart> | Promise<void> | null;
  exportHandlerCallback?: (fileData: BlobPart | Blob, filename: string) => any;
  onSendClick?: () => Promise<void>;
  onTotalClick?: (e: any) => void;
  onExpandVertical?: (e: any) => void;
  onExpandHorizontal?: (e: any) => void;
}

const TableMenu: React.FC<TableMenuProps> = props => {
  const {
    config,
    onSendClick,
    exportHandler,
    exportHandlerCallback,
    getFilename,
    filename,
    duration,
    onTotalClick,
    onExpandHorizontal,
    onExpandVertical,
    ...restProps
  } = props;
  const { translate } = useContext(ConfigContext);

  const context = useContext(TableContext);

  const { tableState, dispatch } = useMemo(() => {
    if (context) {
      return { tableState: context.tableState, dispatch: context.dispatch };
    }
    return { tableState: null, dispatch: null };
  }, [context]);

  const handleExport = useCallback(
    async () => {
      if (exportHandler) {
        let file = filename;
        if (getFilename) {
          file = getFilename();
        }
        const messageKey = "exporting-" + file;

        message.loading({
          content: translate("LOADING"),
          key: messageKey,
          duration: duration
        });

        const fileData = await exportHandler(tableState, file);

        if (!fileData) return;

        saveAs(new Blob([fileData]), file);

        message.success({ content: translate("SUCCESS"), key: messageKey });

        if (exportHandlerCallback && fileData) {
          await exportHandlerCallback(new Blob([fileData]), file);
        }
      }
    },
    //eslint-disable-next-line
    [
      tableState,
      translate,
      exportHandler,
      filename,
      getFilename,
      exportHandlerCallback
    ]
  );
  const handleTotalClick = useCallback(
    (e: any) => {
      e?.stopPropagation();
      e?.preventDefault();
      dispatch &&
        dispatch({
          type: "update",
          payload: { fixedTotal: !tableState?.fixedTotal }
        });
    },
    [dispatch, tableState]
  );

  const handleMenuClick = e => {
    switch (e.key) {
      case "export_xlsx":
        handleExport();
        break;
      case "send_xlsx":
        onSendClick();
        break;
      default:
        break;
    }
  };
  const menu = (
    <Menu onClick={handleMenuClick} className="table-menu-dropdown">
      {config?.fixed_total && (
        <Menu.Item key="fixed_total" className="menu-item-checkbox">
          <Checkbox
            checked={Boolean(tableState?.fixedTotal)}
            onClick={handleTotalClick}
          >
            {translate("FIXED_TOTAL")}
          </Checkbox>
        </Menu.Item>
      )}
      {config?.expand_table_vertically && (
        <Menu.Item key="expand_table_vertically" className="menu-item-checkbox">
          <Checkbox onClick={onExpandVertical}>
            {translate("EXPAND_THE_TABLE_VERTICALLY")}
          </Checkbox>
        </Menu.Item>
      )}
      {config?.expand_table_horizontally && (
        <Menu.Item
          key="expand_table_horizontally"
          className="menu-item-checkbox"
        >
          <Checkbox onClick={onExpandHorizontal}>
            {translate("EXPAND_TABLE_HORIZONTALLY")}
          </Checkbox>
        </Menu.Item>
      )}
      {(config?.fixed_total ||
        config?.expand_table_vertically ||
        config?.expand_table_horizontally) && (
        <Menu.Divider className={"table-menu-dropdown__divider"} />
      )}
      {config?.show_export_xls !== false && (
        <Menu.Item
          key="export_xlsx"
          icon={
            <VerticalAlignBottomOutlined
              className={"table-menu-dropdown__icon"}
            />
          }
        >
          {translate("SAVE_XLS")}
        </Menu.Item>
      )}
      {config?.show_send_to_email && (
        <Menu.Item
          key="send_xlsx"
          icon={<SendOutlined className={"table-menu-dropdown__icon__send"} />}
        >
          {translate("SEND_XLS")}
        </Menu.Item>
      )}
    </Menu>
  );
  const hasMenuItem =
    config?.show_send_to_email ||
    config?.show_export_xls !== false ||
    config?.expand_table_horizontally ||
    config?.expand_table_vertically ||
    config?.fixed_total;
  return hasMenuItem ? (
    <div className="table-menu table-toolbar--right">
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button
          className="table-menu__button"
          icon={<DownOutlined className={"table-menu__icon"} />}
          border={false}
          {...restProps}
        />
      </Dropdown>
    </div>
  ) : null;
};

TableMenu.defaultProps = {
  filename: "exported_table.xlsx"
};

export default TableMenu;
