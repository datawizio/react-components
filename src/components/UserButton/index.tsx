import React from "react";

import Button from "../Button";
import UserAvatar from "../UserAvatar";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";

import "./index.less";
import clsx from "clsx";

export interface UserButtonProps {
  photo: string;
  fullName: string;
  menu: React.ReactElement;
  showFullName?: boolean;
  theme?: "dark" | "light";
}

const UserButton: React.FC<UserButtonProps> = ({
  photo,
  fullName,
  menu,
  theme,
  showFullName
}) => {
  const className = clsx({
    "user-name": true,
    "dw-dark": theme === "dark"
  });
  return (
    <Dropdown overlay={menu} className="user-dropdown" trigger={["click"]}>
      <Button border={false} className={className}>
        <UserAvatar src={photo} name={fullName} />
        {showFullName ? (
          <span className="user-button-fullname">{fullName}</span>
        ) : null}
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default UserButton;
