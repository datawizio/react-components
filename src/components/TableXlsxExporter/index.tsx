import * as React from "react";
import { exportTableToXLSX } from "./exporter";

import { useContext } from "react";
import { TableContext } from "../Table/context";

import Button, { ButtonProps } from "../Button";
import { DownloadOutlined } from "@ant-design/icons";

import "./index.less";

export interface TableXlsxExporterProps extends ButtonProps {
  filename?: string;
}

const TableXlsxExporter: React.FC<TableXlsxExporterProps> = props => {
  const { filename, ...restProps } = props;
  const [{ columns, dataSource, dTypesConfig }] = useContext(TableContext);

  return (
    <div className="table-xlsx-exporter table-toolbar--right">
      <Button
        {...restProps}
        border={false}
        onClick={() =>
          exportTableToXLSX(columns, dataSource, dTypesConfig, filename)
        }
      >
        <DownloadOutlined className={"table-xlsx-exporter__icon"} />
      </Button>
    </div>
  );
};

TableXlsxExporter.defaultProps = {
  filename: "exported table"
};

export default TableXlsxExporter;
