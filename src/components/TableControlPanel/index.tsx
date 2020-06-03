import * as React from "react";
import SearchInput from "../SearchInput";
import SelectTableColumnsModal, {
  SelectTableColumnsModalProps
} from "../SelectColumnsModal";
import { SearchProps } from "antd/lib/input";

import "./index.less";

export interface TableControlPanelProps extends SelectTableColumnsModalProps {
  onSearch?: SearchProps["onSearch"];
}

const TableControlPanel: React.FC<TableControlPanelProps> = props => {
  const { columns, visibleColumnsKeys, onSearch, onSelectColumns } = props;

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
      </div>
    </div>
  );
};

export default TableControlPanel;
