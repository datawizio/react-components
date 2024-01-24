import React from "react";
import Button from "../Button";

type UserMenuItemProps = {
  photo: JSX.Element;
  title: string;
  description: string;
  onClick: () => void;
}

export const UserMenuItem: React.FC<UserMenuItemProps> = ({
  description,
  photo,
  title,
  onClick
}) => {
  return (
    <div className="user-menu-item" onClick={onClick}>
      {photo}
      <div className="user-menu-item-text">
        <span className="user-menu-item-text-title">{title}</span>
        <span>{description}</span>
      </div>
    </div>
  )
}