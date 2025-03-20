export type WSMessage = {
  id?: string;
  type: "subscribe" | "complete" | "connection_init" | "ping" | "error";
  payload?: Record<string, string>;
};

export class WebSocketManager {
  private _ws: WebSocket | null = null;
  private _server: string;
  private _getAuthToken: () => Promise<string> | string;
  private _authToken: string | null = null;

  private _subscriptions: Record<string, Map<string, Function>> = {};
  private _messages: Record<string, WSMessage> = {};
  private _queue: WSMessage[] = [];
  private _counter: number = 0;

  private _isOnline: boolean = true;
  private _pingIntervalId!: ReturnType<typeof setInterval>;

  private readonly CONNECTION_LIMIT = 20;

  private _initEvents() {
    window.addEventListener("online", () => {
      this._isOnline = true;
      this._reconnect();
    });

    window.addEventListener("offline", () => {
      this._isOnline = false;
    });

    window.addEventListener("visibilitychange", () => {
      this._reconnect();
    });
  }

  private _initWS() {
    this._ws = new WebSocket(this._server, ["graphql-transport-ws"]);

    this._ws.addEventListener("open", this._onOpen.bind(this));
    this._ws.addEventListener("close", this._onClose.bind(this));
    this._ws.addEventListener("error", this._onError.bind(this));
    this._ws.addEventListener("message", this._onMessage.bind(this));
  }

  public init(server: string, getAuthToken: () => Promise<string> | string) {
    this._server = server;
    this._getAuthToken = getAuthToken;
    this._initWS();
    this._initEvents();
  }

  private async _onOpen() {
    this._authToken = await this._getAuthToken();

    this._queue.unshift({
      type: "connection_init",
      payload: { authorization: this._authToken }
    });

    while (this._queue.length > 0) {
      this.sendMessage(this._queue[0]);
      this._queue.shift();
    }

    if (this._counter > 0) {
      Object.values(this._messages).forEach(msg => {
        this.sendMessage(msg);
      });
    }

    // Send ping message every 30 seconds to keep the connection alive
    this._pingIntervalId = setInterval(
      () => this.sendMessage({ type: "ping" }),
      30_000
    );
  }

  private _onClose(event: CloseEvent) {
    this._counter++;
    clearInterval(this._pingIntervalId);
    this._authToken = null;
    console.warn(
      "WebSocket is closed.",
      event.reason && `Reason: ${event.reason}`
    );
  }

  private _onError(event: Event) {
    console.error("WebSocket encountered error. Closing connection.", event);
    this._ws?.close();
  }

  private _onMessage(event: MessageEvent) {
    const data = JSON.parse(event.data);
    this._handleSubscriptions(data);
  }

  private _reconnect() {
    if (this._ws && this._ws.readyState === WebSocket.OPEN && this._authToken) {
      return;
    }

    if (
      this._isOnline &&
      document.visibilityState === "visible" &&
      this._counter < this.CONNECTION_LIMIT
    ) {
      console.warn("Reconnect will be attempted in 3 seconds.");
      setTimeout(() => this._initWS(), 3000);
    }
  }

  public sendMessage(message: WSMessage) {
    if (this._ws && this._ws.readyState === WebSocket.OPEN && this._authToken) {
      const id = message.id?.split("|")[0];
      const query = message.payload?.query;

      if (id && !query?.startsWith("mutation")) {
        this._messages[id] = message;
      }

      this._ws.send(JSON.stringify(message));
      return;
    }

    this._queue.push(message);
  }

  public subscribe(
    id: string,
    subscriptionId: string,
    callback: (message: WSMessage) => any,
    message?: WSMessage
  ) {
    if (!this._subscriptions[id]) {
      this._subscriptions[id] = new Map();
    }

    this._subscriptions[id].set(subscriptionId, callback);
    if (message) this._messages[id] = message;
  }

  public unsubscribe(id: string, subscriptionId: string) {
    if (this._subscriptions[id]?.has(subscriptionId)) {
      this._subscriptions[id].delete(subscriptionId);
      this.sendMessage({ id, type: "complete" });
    }
  }

  private _handleSubscriptions(message: WSMessage) {
    // The notification ID may have a "salt" at the end, separated by a pipe
    // because we cannot send two subscriptions with the same ID.
    // Here we remove this salt to find the correct subscription handler by primary ID.
    const id = message.id?.split("|")[0];

    if (!id || !this._subscriptions[id]) return;
    this._subscriptions[id].forEach(callback => callback(message));
  }
}

export const ws = new WebSocketManager();
