import React from "react";

import Button from "../Button";
import UserAvatar from "../UserAvatar";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";

import "./index.less";

export interface UserButtonProps {
  photo: string;
  fullName: string;
  menu: React.ReactElement;
  showFullName?: boolean;
}

const UserButton: React.FC<UserButtonProps> = ({
  photo,
  fullName,
  menu,
  showFullName
}) => {
  return (
    <Dropdown overlay={menu} className="user-dropdown">
      <Button border={false} className="user-name">
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
