import React, { useEffect } from "react";
import Button from "../Button";
import { BellOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { useState } from "react";
import Badger, { BadgerOptions } from "../FaviconBadger";
import { useDeepEqualMemo } from "../../hooks/useDeepEqualMemo";
import { sendMessage, subscribe, unsubscribe } from "../../utils/ws";
import "./index.less";

export interface NotificationButtonProps {
  useWS?: boolean;
  faviconBadgerOptions?: BadgerOptions;
  count: number;
  onClick: React.MouseEventHandler<HTMLElement>;
  tooltip?: string;
  disabled?: boolean;
}

const badgeOptions: BadgerOptions = { size: 0.35, radius: 50 };

const faviconBadge = new Badger(badgeOptions);

const NotificationButton: React.FC<NotificationButtonProps> = ({
  count,
  faviconBadgerOptions,
  useWS,
  tooltip,
  disabled,
  onClick
}) => {
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
    <Badge
      className={`notification-btn ${
        disabled ? "notification-btn--disabled" : ""
      }`}
      dot={state > 0}
    >
      <Button
        type="link"
        onClick={onClick}
        icon={<BellOutlined />}
        disabled={disabled}
        title={tooltip}
      ></Button>
    </Badge>
  );
};

export default NotificationButton;
