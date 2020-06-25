import React from "react";

import Button from "../Button";
import UserAvatar from "../UserAvatar";
import { DownOutlined } from "@ant-design/icons";

import "./index.less";

export interface UserButtonProps {
  photo: string;
  fullName: string;
}

const UserButton: React.FC<UserButtonProps> = ({ photo, fullName }) => {
  return (
    <Button border={false} className="user-name">
      <UserAvatar src={photo} name={fullName} />
      {fullName}
      <DownOutlined />
    </Button>
  );
};

export default UserButton;
