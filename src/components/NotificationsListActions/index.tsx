import React, { useContext } from "react";
import Button from "../Button";
import { useTranslation } from "react-i18next";

import { UndoOutlined } from "@ant-design/icons";
import { EnvelopeIcon } from "../Icons/EnvelopeIcon";
import { DeleteIcon } from "../Icons/DeleteIcon";
import { MailIcon } from "../Icons/MailIcon";

import { NotificationsListContext } from "../NotificationsList/context";
import {
  NotificationActions,
  NotificationPageType
} from "../NotificationsList/types";

import "./index.less";

interface ListActionsProps extends Omit<NotificationActions, "onOpenLink"> {
  pageType?: NotificationPageType;
  unreadNotificationsCount?: number;
}

const ListActions: React.FC<ListActionsProps> = React.memo(
  ({
    pageType,
    unreadNotificationsCount,
    onMarkAsRead,
    onMarkAsUnread,
    onRestore,
    onDelete
  }) => {
    const { t } = useTranslation();
    const { state } = useContext(NotificationsListContext);

    const checkedKeysData = state?.dataSource?.filter(item =>
      state.checkedKeys.has(item.id)
    );

    const isSomeRead = checkedKeysData?.some(item => item.read);
    const isSomeUnread = checkedKeysData?.some(item => !item.read);

    const showReadButton = state.checkedAll
      ? unreadNotificationsCount > 0
      : isSomeUnread;

    const showUnreadButton =
      pageType !== "unread_page" &&
      (state.checkedAll
        ? unreadNotificationsCount !== state.total
        : isSomeRead);

    return state?.checkedKeys && state?.checkedKeys.size > 0 ? (
      <div className="notifications-actions">
        {showReadButton && (
          <Button onClick={onMarkAsRead} type="link" icon={<EnvelopeIcon />}>
            {t("MARK_AS_READ")}
          </Button>
        )}
        {showUnreadButton && (
          <Button onClick={onMarkAsUnread} type="link" icon={<MailIcon />}>
            {t("MARK_AS_UNREAD")}
          </Button>
        )}
        {pageType === "deleted_page" && (
          <Button onClick={onRestore} type="link" icon={<UndoOutlined />}>
            {t("REVERT")}
          </Button>
        )}
        <Button onClick={onDelete} type="link" icon={<DeleteIcon />}>
          {t("DELETE")}
        </Button>
      </div>
    ) : null;
  }
);

ListActions.defaultProps = {
  pageType: null
};

export default ListActions;
