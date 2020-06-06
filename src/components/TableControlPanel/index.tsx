import * as React from "react";
import SearchInput from "../SearchInput";
import SelectTableColumnsModal, {
  SelectTableColumnsModalProps
} from "../SelectColumnsModal";
import Button from "../Button";
import { SearchProps } from "antd/lib/input";
import { DownloadOutlined } from "@ant-design/icons";

import "./index.less";

export interface TableControlPanelProps extends SelectTableColumnsModalProps {
  onSearch?: SearchProps["onSearch"];
  onExport?: () => void;
}

const TableControlPanel: React.FC<TableControlPanelProps> = props => {
  const {
    columns,
    visibleColumnsKeys,
    onSearch,
    onSelectColumns,
    onExport
  } = props;

  return (
    <div className="table-control-panel">
      <div className="table-control-panel__left-side">
        <SearchInput enterButton onSearch={onSearch} style={{ width: 250 }} />
      </div>

      <div className="table-control-panel__right-side">
        <SelectTableColumnsModal
          columns={columns}
          onSelectColumns={onSelectColumns}
          visibleColumnsKeys={visibleColumnsKeys}
        />

        <Button onClick={onExport} border={false}>
          <DownloadOutlined />
        </Button>
      </div>
    </div>
  );
};

export default TableControlPanel;
