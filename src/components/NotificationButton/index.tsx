import * as React from "react";

import Button from "../Button";
import { BellOutlined } from "@ant-design/icons";
import { Badge } from "antd";

import { useContext, useState } from "react";
import ConfigContext from "../ConfigProvider/context";
import Badger from "../FaviconBadger";

import { sendMessage, subscribe, unsubscribe } from "../../utils/ws";
import "./index.less";

export interface NotificationButtonProps {
  useWS?: boolean;
  count: number;
  onClick: () => void;
}

const faviconBadge = new Badger({ size: 0.35, radius: 50 });

const NotificationButton: React.FC<NotificationButtonProps> = ({
  count,
  useWS,
  onClick
}) => {
  const { translate } = useContext(ConfigContext);
  const [state, setState] = useState<number>(count);

  React.useEffect(() => {
    if (!useWS) return;
    subscribe("unread-notifications", "notification-btn", data => {
      setState(data["payload"]["data"]["unreadNotificationsCount"]["count"]);
    });
    sendMessage({
      "id": "unread-notifications",
      "type": "subscribe",
      "payload": {
        "query": "subscription { unreadNotificationsCount {count} }"
      }
    });
    return () => {
      unsubscribe("unread-notifications", "notification-btn");
    };
  }, [useWS]);

  React.useEffect(() => {
    faviconBadge.value = state;
  }, [state]);

  return (
    <Badge count={state} className="notification-btn">
      <Button type="link" onClick={onClick} icon={<BellOutlined />}>
        {translate("NOTIFICATIONS")}
      </Button>
    </Badge>
  );
};

export default NotificationButton;
