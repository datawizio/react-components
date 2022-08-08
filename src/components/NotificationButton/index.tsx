import React, { useEffect } from "react";

import Button from "../Button";
import { BellOutlined } from "@ant-design/icons";
import { Badge } from "antd";

import { useContext, useState } from "react";
import ConfigContext from "../ConfigProvider/context";
import Badger, { BadgerOptions } from "../FaviconBadger";

import { useDeepEqualMemo } from "../../hooks/useDeepEqualMemo";
import { sendMessage, subscribe, unsubscribe } from "../../utils/ws";
import "./index.less";

export interface NotificationButtonProps {
  useWS?: boolean;
  faviconBadgerOptions?: BadgerOptions;
  count: number;
  onClick: React.MouseEventHandler<HTMLElement>;
}

const badgeOptions: BadgerOptions = { size: 0.35, radius: 50 };

const faviconBadge = new Badger(badgeOptions);

const NotificationButton: React.FC<NotificationButtonProps> = ({
  count,
  faviconBadgerOptions,
  useWS,
  onClick
}) => {
  const { translate } = useContext(ConfigContext);
  const [state, setState] = useState<number>(count);

  useEffect(() => {
    faviconBadge.value = 0;
    if (!useWS) return;
    subscribe("unread-notifications", "notification-btn", data => {
      const count =
        data["payload"]["data"]["unreadNotificationsCount"]["count"];
      setState(count);
      faviconBadge.value = count;
    });
    sendMessage({
      "id": "unread-notifications",
      "type": "subscribe",
      "payload": {
        "query": "subscription { unreadNotificationsCount {count} }"
      }
    });
    return () => {
      sendMessage({ id: "unread-notifications", complete: true });
      unsubscribe("unread-notifications", "notification-btn");
    };
  }, [useWS]);

  useEffect(() => {
    if (!faviconBadgerOptions) return;
    faviconBadge.updateOptions(
      Object.assign(badgeOptions, faviconBadgerOptions)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useDeepEqualMemo(faviconBadgerOptions)]);

  return (
    <Badge count={state} className="notification-btn">
      <Button type="link" onClick={onClick} icon={<BellOutlined />}>
        {translate("NOTIFICATIONS")}
      </Button>
    </Badge>
  );
};

export default NotificationButton;
