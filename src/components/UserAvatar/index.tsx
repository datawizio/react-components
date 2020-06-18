import React, { useMemo } from "react";
import { Avatar } from "antd";

export interface UserAvatarProps {
  src?: string;
  name?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ src, name }) => {
  const abbr = useMemo(
    () =>
      name
        .split(" ")
        .map(i => i[0])
        .join(""),
    [name]
  );

  return (
    <Avatar src={src} size={64}>
      {abbr}
    </Avatar>
  );
};

export default UserAvatar;
