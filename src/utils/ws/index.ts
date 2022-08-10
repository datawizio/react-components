export let ws: WebSocket;

type WSMessage = {
  id: string;
};

const subscriptions: { [key: string]: Map<string, Function> } = {};

const queue: Set<Object> = new Set();

export const initWS = (
  server: string,
  authData: {
    sessionid?: string;
    authorization?: string;
  }
) => {
  ws = new WebSocket(server, ["graphql-transport-ws"]);

  ws.onopen = () => {
    sendMessage({
      "type": "connection_init",
      "payload": authData
    });

    queue.forEach(message => {
      sendMessage(message);
      queue.delete(message);
    });
  };

  ws.onclose = function (e) {
    console.warn(
      "Socket is closed. Reconnect will be attempted in 1 second.",
      e.reason
    );
    setTimeout(function () {
      initWS(server, authData);
    }, 1000);
  };

  ws.onerror = function (err) {
    //@ts-ignore
    console.error("Socket encountered error: ", err.message, "Closing socket");
    ws.close();
  };

  ws.onmessage = event => {
    const data = JSON.parse(event.data);
    handleSubscriptions(data);
  };
};

export const sendMessage = (message: Object) => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
    return;
  }
  queue.add(message);
};

export const subscribe = (
  id: string,
  subscriptionId: string,
  callback: (message: WSMessage) => any
) => {
  if (!subscriptions[id]) {
    subscriptions[id] = new Map();
  }

  subscriptions[id].set(subscriptionId, callback);
};

export const unsubscribe = (id: string, subscriptionId: string) => {
  if (subscriptions[id] && subscriptions[id].has(subscriptionId)) {
    subscriptions[id].delete(subscriptionId);
  }
};

const handleSubscriptions = (message: WSMessage) => {
  const id = message.id;
  if (!subscriptions[id]) return;
  subscriptions[id].forEach(callback => {
    callback.call(null, message);
  });
};
