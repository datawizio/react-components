import React, { useEffect, useState } from "react";

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
  open?: boolean;
  handleOpenChange?: (value: boolean) => void;
}

const UserButton: React.FC<UserButtonProps> = ({
  photo,
  fullName,
  menu,
  theme,
  showFullName,
  open,
  handleOpenChange
}) => {
  const className = clsx({
    "user-name": true,
    "dw-dark": theme === "dark"
  });
  const [visible, setVisible] = useState<boolean>();
  const handleVisibleChange = (value: boolean) => {
    setVisible(value);
    handleOpenChange && handleOpenChange(value);
  }
  useEffect(() => setVisible(open), [open]);

  return (
    <Dropdown
      overlay={menu}
      className="user-dropdown"
      trigger={["click"]}
      visible={visible}
      onVisibleChange={handleVisibleChange}
    >
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
