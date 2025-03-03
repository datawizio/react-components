export let ws: WebSocket;

type WSMessage = {
  id: string;
};

const subscriptions: { [key: string]: Map<string, Function> } = {};

const queue: Set<Object> = new Set();

const CONNECTION_LIMIT = 5;

let counter = 0;

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
    counter = counter + 1;

    console.warn(
      "Socket is closed. Reconnect will be attempted in 1 second.",
      e.reason
    );

    if (counter < CONNECTION_LIMIT) {
      setTimeout(function () {
        initWS(server, authData);
      }, 3000);
    }
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
    sendMessage({ id, type: "complete" });
  }
};

const handleSubscriptions = (message: WSMessage) => {
  // The notification ID may have a "salt" at the end, separated by a pipe
  // because we cannot send two subscriptions with the same ID.
  // Here we remove this salt to find the correct subscription handler by primary ID.
  const id = message.id?.split("|")[0];

  if (!subscriptions[id]) return;
  subscriptions[id].forEach(callback => {
    callback.call(null, message);
  });
};
