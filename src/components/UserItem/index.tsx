import React from "react";
import UserAvatar from "../UserAvatar";

import "./index.less";

export interface UserAvatarProps {
  photo?: string | null;
  email?: string;
  fullName: string;
}

const UserItem: React.FC<UserAvatarProps> = ({ photo, email, fullName }) => {
  return (
    <div className="user-cell">
      <div className="user-cell__photo">
        <UserAvatar src={photo} name={fullName} />
      </div>
      <div className="user-cell__info">
        <span className="user-cell__full-name">{fullName}</span>
        <span className="user-cell__email">{email}</span>
      </div>
    </div>
  );
};

export default UserItem;
