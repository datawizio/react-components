import * as React from "react";

import Button from "../Button";
import { BellOutlined } from "@ant-design/icons";
import { Badge } from "antd";

import { useState } from "react";

import "./index.less";
import { sendMessage, subscribe, unsubscribe } from "../../utils/ws";

export interface NotificationButtonProps {
  useWS?: boolean;
  count: number;
  onClick: () => void;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({
  count,
  useWS,
  onClick
}) => {
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

  return (
    <Badge className="notification-btn" dot={state > 0}>
      <Button type="link" onClick={onClick} icon={<BellOutlined />}></Button>
    </Badge>
  );
};

export default NotificationButton;
