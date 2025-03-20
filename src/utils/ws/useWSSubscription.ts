import { useEffect } from "react";
import { ws } from "./";

interface useWSSubscriptionProps {
  id: string;
  message?: any;
  callback?: (message: any) => void;
}

export const useWSSubscription = ({
  id,
  message,
  callback
}: useWSSubscriptionProps) => {
  useEffect(() => {
    const subscriptionId = `ws_${Math.random()}`;
    ws.subscribe(id ?? "", subscriptionId, callback, message);

    if (message) {
      ws.sendMessage(message);
    }

    return () => {
      ws.unsubscribe(id ?? "", subscriptionId);
    };
  }, []);
};
