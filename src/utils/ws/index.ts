export let ws: WebSocket;

type WSMessage = {
  id: string;
};

const subsriptions: { [key: string]: Map<string, Function> } = {};

let connected = false;
const queue: Array<Object> = [];

export const initWS = (authData: {
  sessionid?: string;
  authorization?: string;
}) => {
  console.log(authData);
  ws = new WebSocket(`ws://127.0.0.1:8866/ws`, ["graphql-transport-ws"]);

  ws.onopen = () => {
    connected = true;
    sendMessage({
      "type": "connection_init",
      "payload": authData
    });

    queue.forEach(message => sendMessage(message));
  };

  ws.onmessage = event => {
    const data = JSON.parse(event.data);
    handleSubscriptions(data);
  };
};

export const sendMessage = (message: Object) => {
  if (!connected) {
    queue.push(message);
    return;
  }

  ws.send(JSON.stringify(message));
};

export const subscribe = (
  id: string,
  subscriptionId: string,
  callback: (message: WSMessage) => any
) => {
  if (!subsriptions[id]) {
    subsriptions[id] = new Map();
  }

  subsriptions[id].set(subscriptionId, callback);
};

export const unsubscribe = (id: string, subscriptionId: string) => {
  if (subsriptions[id] && subsriptions[id].has(subscriptionId)) {
    subsriptions[id].delete(subscriptionId);
  }
};

const handleSubscriptions = (message: WSMessage) => {
  const id = message.id;
  if (!subsriptions[id]) return;
  subsriptions[id].forEach(callback => {
    callback.call(null, message);
  });
};
