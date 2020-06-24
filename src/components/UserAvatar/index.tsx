import React, { useMemo } from "react";
import { Avatar } from "antd";

export interface UserAvatarProps {
  src?: string | null;
  name?: string;
  size?: number;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ src, name, size }) => {
  const abbr = useMemo(
    () =>
      name
        .split(" ")
        .map(i => i[0])
        .join(""),
    [name]
  );

  return (
    <Avatar src={src ? src : undefined} size={size}>
      {abbr}
    </Avatar>
  );
};

export default UserAvatar;
