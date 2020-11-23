import * as React from "react";
import { useContext, useMemo } from "react";
import { Typography } from "antd";
import ConfigContext from "../ConfigProvider/context";
import Table from "../Table";
import TableSelectColumnsModal from "../TableSelectColumnsModal";
import DTBar, { DTBarType } from "../Table/dtypes/DTBar";
import DTNumberRange from "../Table/dtypes/DTNumberRange";
import { IColumn, IRow, TableProps } from "../Table/types";
import "./index.less";

export interface IBarTable {
  dataProvider: () => {};
  titleKey?: string;
  height?: number;
  tooltip?: (cellVal: DTBarType, row: IRow, column: IColumn) => React.ReactNode;
}

const BarTable: React.FC<IBarTable> = ({ dataProvider, titleKey, height, tooltip }) => {
  const { translate } = useContext(ConfigContext);
  const { Title } = Typography;
  const defaultHeight = 244;

  const config: TableProps = useMemo(() => {
    return {
      className: "BarTable",
      height: height ? `${height}px` : `${defaultHeight}px`,
      columnsConfig: {
        status: {
          fixed: "left"
        }
      },
      dTypesConfig: {
        bar: {...DTBar, tooltip},
        number_range: DTNumberRange
      },
      pagination: false,
      dataProvider
    };
  }, [dataProvider, height, tooltip]);

  return (
    <>
      {titleKey && (
        <Title level={4} className="bar-table-title">
          {translate(titleKey)}
        </Title>
      )}
      <Table {...config}>
        <Table.ToolBar>
          <TableSelectColumnsModal />
        </Table.ToolBar>
      </Table>
    </>
  );
};

export default BarTable;