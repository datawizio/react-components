import * as React from "react";
import { message } from "antd";
import { saveAs } from "file-saver";
import { TableState } from "../Table/types";

import { useContext, useCallback, useMemo } from "react";
import { TableContext } from "../Table/context";
import ConfigContext from "../ConfigProvider/context";

import Button, { ButtonProps } from "../Button";
import { DownloadOutlined } from "@ant-design/icons";

import "./index.less";

export interface TableXlsxExporterProps extends ButtonProps {
  filename?: string;
  getFilename?: () => string;
  duration?: number;
  exportHandler?: (
    tableState: TableState | null,
    filename: string
  ) => Promise<BlobPart> | Promise<void> | null;
  exportHandlerCallback?: (fileData: BlobPart | Blob, filename: string) => any;
}

const TableXlsxExporter: React.FC<TableXlsxExporterProps> = props => {
  const {
    exportHandler,
    exportHandlerCallback,
    getFilename,
    duration,
    filename,
    title,
    children,
    ...restProps
  } = props;

  const { translate } = useContext(ConfigContext);

  const context = useContext(TableContext);

  const tableState = useMemo(() => {
    if (context) {
      return context.tableState;
    }
    return null;
  }, [context]);

  const handleExport = useCallback(async () => {
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
      fileData && saveAs(new Blob([fileData]), file);

      message.success({ content: translate("SUCCESS"), key: messageKey });

      if (exportHandlerCallback && fileData) {
        await exportHandlerCallback(new Blob([fileData]), file);
      }
    }
  }, [
    tableState,
    translate,
    exportHandler,
    filename,
    getFilename,
    exportHandlerCallback
  ]);

  return (
    <div className="table-xlsx-exporter table-toolbar--right">
      <Button
        icon={<DownloadOutlined className={"table-xlsx-exporter__icon"} />}
        border={false}
        {...restProps}
        onClick={handleExport}
        title={title ? title : translate("SAVE_BTN_TITLE")}
      />
    </div>
  );
};

TableXlsxExporter.defaultProps = {
  filename: "exported_table.xlsx"
};

export default TableXlsxExporter;
