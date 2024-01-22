import React from "react";
import Icon from "@ant-design/icons";

const MyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
    <path
      d="M7.5 15H5.16667C4.85725 15 4.5605 14.8771 4.34171 14.6583C4.12292 14.4395 4 14.1428 4 13.8333V5.66667C4 5.35725 4.12292 5.0605 4.34171 4.84171C4.5605 4.62292 4.85725 4.5 5.16667 4.5H7.5M11.5835 12.6666L14.5002 9.74992M14.5002 9.74992L11.5835 6.83325M14.5002 9.74992L7.5 9.75"
      stroke={window.theme === "dark" ? "#FFFFFF" : "#1C1C1C"}
    />
  </svg>
);

export const LogOutIcon = () => <Icon component={MyIcon} />;