import * as React from "react";
import { message } from "antd";
import { saveAs } from "file-saver";
import { TableState } from "../Table/types";

import { useContext, useCallback } from "react";
import { TableContext } from "../Table/context";
import ConfigContext from "../ConfigProvider/context";

import Button, { ButtonProps } from "../Button";
import { DownloadOutlined } from "@ant-design/icons";

import "./index.less";

export interface TableXlsxExporterProps extends ButtonProps {
  filename?: string;
  exportHandler?: (
    tableState: TableState,
    filename: string
  ) => Promise<BlobPart> | Promise<void>;
  exportHandlerCallback?: (
    fileData: any,
    filename: string
  ) => Promise<void>;
}

const TableXlsxExporter: React.FC<TableXlsxExporterProps> = props => {
  const { exportHandler, exportHandlerCallback, filename, ...restProps } = props;

  const { translate } = useContext(ConfigContext);
  const { tableState } = useContext(TableContext);

  const handleExport = useCallback(async () => {
    if (exportHandler) {
      const messageKey = "exporting-" + filename;

      message.loading({ content: translate("LOADING"), key: messageKey });

      const fileData = await exportHandler(tableState, filename);
      fileData && saveAs(new Blob([fileData]), filename);

      message.success({ content: translate("SUCCESS"), key: messageKey });

      if (exportHandlerCallback && fileData) {
        await exportHandlerCallback(fileData, filename);
      }
    }
  }, [tableState, translate, exportHandler, filename, exportHandlerCallback]);

  return (
    <div className="table-xlsx-exporter table-toolbar--right">
      <Button
        {...restProps}
        border={false}
        onClick={handleExport}
        title={translate("SAVE_BTN_TITLE")}
      >
        <DownloadOutlined className={"table-xlsx-exporter__icon"} />
      </Button>
    </div>
  );
};

TableXlsxExporter.defaultProps = {
  filename: "exported_table.xlsx"
};

export default TableXlsxExporter;
