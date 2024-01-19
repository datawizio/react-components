import * as React from "react";
import {
  CalendarOutlined,
  ProfileOutlined,
  HistoryOutlined,
  CreditCardOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  ContainerOutlined
} from "@ant-design/icons";

export enum ColumnIcons {
  Calendar = "calendar",
  Profile = "profile",
  History = "history",
  CreditCard = "credit_card",
  Dollar = "dollar",
  CheckCircle = "check_circle",
  Container = "container"
}

const columnIcons: { [key in ColumnIcons]: JSX.Element } = {
  [ColumnIcons.Calendar]: <CalendarOutlined />,
  [ColumnIcons.Profile]: <ProfileOutlined />,
  [ColumnIcons.History]: <HistoryOutlined />,
  [ColumnIcons.CreditCard]: <CreditCardOutlined />,
  [ColumnIcons.Dollar]: <DollarOutlined />,
  [ColumnIcons.CheckCircle]: <CheckCircleOutlined />,
  [ColumnIcons.Container]: <ContainerOutlined />
}

export { columnIcons };