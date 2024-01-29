import React from "react";
import { BESIcon } from "../images/BES";
import { PaymentIcon } from "../images/Payment";
import { RolesIcon } from "../images/Roles";
import { UsersIcon } from "../images/Users";
import { ConnectorIcon } from "../images/Connector";

export interface ILinkGroup {
  title?: string;
  items: Array<ILinkItem>;
}

export interface ILinkItem {
  photo: JSX.Element;
  title: string;
  description: string;
  host: string;
  path: string;
  target: "_blank" | "_self";
  appId?: string;
  permission?: string;
}

export const linkGroups: Array<ILinkGroup> = [
  {
    items: [
      {
        photo: <BESIcon />,
        title: "ACCOUNT",
        description: "ACCOUNT_DESCRIPTION",
        host: "https://bes.datawiz.io",
        path: "/account/profile",
        appId: "29",
        target: "_blank"
      }
    ]
  },
  {
    title: "Admin Panel",
    items: [
      {
        photo: <PaymentIcon />,
        title: "PAYMENT_AND_SUBSCRIPTIONS",
        description: "PAYMENT_AND_SUBSCRIPTIONS_DESCRIPTION",
        host: "https://admin-panel.datawiz.io",
        path: "/c/:client_id/subscriptions",
        permission: "ap-payments-and-subscriptions",
        appId: "22",
        target: "_self"
      },
      {
        photo: <RolesIcon />,
        title: "ADMIN_ROLES",
        description: "ADMIN_ROLES_DESCRIPTION",
        host: "https://admin-panel.datawiz.io",
        path: "/c/:client_id/roles",
        permission: "roles",
        appId: "22",
        target: "_self"
      },
      {
        photo: <UsersIcon />,
        title: "ADMIN_USERS",
        description: "ADMIN_USERS_DESCRIPTION",
        host: "https://admin-panel.datawiz.io",
        path: "/c/:client_id/users",
        permission: "users",
        appId: "22",
        target: "_self"
      }
    ]
  },
  {
    title: "Connector",
    items: [
      {
        photo: <ConnectorIcon />,
        title: "DATA_SOLUTIONS",
        description: "DATA_SOLUTIONS_DESCRIPTION",
        host: "https://connector.datawiz.io",
        path: "/c/:client_id",
        permission: "profile-allowed-connector",
        appId: "51",
        target: "_self"
      }
    ]
  }
]