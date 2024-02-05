import React, { useCallback, useContext, useMemo } from "react";
import UserAvatar from "../UserAvatar";
import ConfigContext from "../ConfigProvider/context";
import dayjs from "dayjs";
import { UserMenuItem } from "./UserMenuItem";
import { ILinkGroup, ILinkItem, linkGroups } from "./helpers/data";
import Button from "../Button";
import { LogOutIcon } from "./images/LogOut";
import "./index.less";

export type UserMenuProps = {
  photo?: string;
  fullName: string;
  email: string;
  handleLogOutClick: () => void;
  expireDateTo?: string;
  handleItemClick?: (item: ILinkItem) => void;
  permissions?: Set<string>;
}

const DATE_FORMAT = "DD.MM.YYYY";

const UserMenu: React.FC<UserMenuProps> = ({
  photo,
  fullName,
  email,
  expireDateTo,
  handleLogOutClick,
  handleItemClick,
  permissions
}) => {
  const { translate } = useContext(ConfigContext);
  const checkPermission = useCallback(
    (item: ILinkItem) => !permissions || !item.permission || permissions.has(item.permission),
    [permissions]
  );
  const links: Array<ILinkGroup> = useMemo(() => {
    return linkGroups
      .filter(group => group.items.some(checkPermission))
      .map(group => ({
        title: group.title,
        items: group.items.filter(checkPermission)
      }))
  }, [checkPermission]);

  return (
    <div className="user-menu">
      <div className="user-menu-info">
        <UserAvatar src={photo} size={64} name={fullName} />
        <span className="user-menu-info-name">{fullName}</span>
        <span className="user-menu-info-email">{email}</span>
        {
          expireDateTo &&
          <span className="user-menu-info-date">
            {translate("ACCOUNT_IS_ACTIVE_TO")}: {dayjs(expireDateTo).format(DATE_FORMAT)}
          </span>
        }
      </div>
      <div className="user-menu-items">
        {
          links.map((group, index) =>
            <div key={index} className="user-menu-items-group">
              {group.title && <span className="user-menu-items-group-title">{translate(group.title)}</span>}
              {
                group.items.map((item, index) =>
                  <UserMenuItem
                    key={index}
                    photo={item.photo}
                    title={translate(item.title)}
                    description={translate(item.description)}
                    onClick={() => handleItemClick(item)}
                  />
                )
              }
            </div>
          )
        }
      </div>
      <div className="user-menu-button">
        <Button icon={<LogOutIcon />} onClick={handleLogOutClick}>{translate("LOGOUT")}</Button>
      </div>
    </div>
  );
}

export default UserMenu;