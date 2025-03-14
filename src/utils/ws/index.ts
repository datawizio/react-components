export let ws: WebSocket;

type WSMessage = {
  id: string;
};

const subscriptions: { [key: string]: Map<string, Function> } = {};
const messages: Record<string, WSMessage> = {};
const queue: Set<Object> = new Set();

const CONNECTION_LIMIT = 20;

let counter = 0;
let isOnline = true;
let reconnect: () => void;
let pingIntervalId: ReturnType<typeof setInterval>;

window.addEventListener("online", () => {
  isOnline = true;
  reconnect();
});

window.addEventListener("offline", () => {
  isOnline = false;
});

window.addEventListener("visibilitychange", () => reconnect());

export const initWS = (
  server: string,
  getAuthToken: () => string | Promise<string>
) => {
  ws = new WebSocket(server, ["graphql-transport-ws"]);

  reconnect = () => {
    if (ws.readyState === WebSocket.OPEN) {
      return;
    }

    if (
      isOnline &&
      document.visibilityState === "visible" &&
      counter < CONNECTION_LIMIT
    ) {
      setTimeout(function () {
        initWS(server, getAuthToken);
      }, 3000);
    }
  };

  ws.onopen = async () => {
    const authToken = await getAuthToken();

    sendMessage({
      "type": "connection_init",
      "payload": { "authorization": authToken }
    });

    queue.forEach(message => {
      sendMessage(message);
      queue.delete(message);
    });

    if (counter > 0) {
      Object.values(messages).forEach(msg => sendMessage(msg));
    }

    // Send ping message every 30 seconds to keep the connection alive
    pingIntervalId = setInterval(() => sendMessage({ type: "ping" }), 30_000);
  };

  ws.onclose = function (e) {
    counter = counter + 1;
    clearInterval(pingIntervalId);

    console.warn(
      "Socket is closed. Reconnect will be attempted in 3 seconds.",
      e.reason && `Reason: ${e.reason}`
    );
  };

  ws.onerror = function (err) {
    console.error("WebSocket encountered error. Closing connection.", err);
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
  callback: (message: WSMessage) => any,
  message?: WSMessage
) => {
  if (!subscriptions[id]) {
    subscriptions[id] = new Map();
  }

  subscriptions[id].set(subscriptionId, callback);
  if (message) messages[id] = message;
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
