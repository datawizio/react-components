import React, { useMemo } from "react";
import { Avatar } from "antd";

export interface UserAvatarProps {
  src?: string | null;
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
    <Avatar src={src ? src : undefined} size={64}>
      {abbr}
    </Avatar>
  );
};

export default UserAvatar;
