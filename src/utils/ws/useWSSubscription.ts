import React, { useEffect } from "react";
import { sendMessage, subscribe, unsubscribe } from ".";

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
    subscribe(id ?? "", subscriptionId, callback);

    if (message) {
      sendMessage(message);
    }

    return () => {
      unsubscribe(id ?? "", subscriptionId);
    };
  }, []);
};
