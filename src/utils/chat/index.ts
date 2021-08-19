export interface IUser {
  full_name: string;
  email: string;
  photo: string;
  user_id?: number;
}

export interface IClient {
  id: number;
  name: string;
}

declare global {
  interface Window {
    $crisp: any;
    CRISP_RUNTIME_CONFIG: any;
    CRISP_TOKEN_ID?: string | number;
    CRISP_WEBSITE_ID: string;
  }
}

export function initChat({
  user,
  lang,
  client,
  clients
}: {
  user: IUser;
  lang: string;
  client?: string;
  clients?: IClient[];
}) {
  window.$crisp = [
    ["set", "user:email", user.email],
    ["set", "user:nickname", user.full_name],
    ["set", "user:avatar", user.photo]
  ];
  if (client) {
    window.$crisp.push(["set", "session:data", [[["Client", client]]]]);
  }
  if (clients) {
    window.$crisp.push([
      "set",
      "session:data",
      [[["Clients", clients.map(client => client.name).join(", ")]]]
    ]);
  }
  window.CRISP_RUNTIME_CONFIG = {
    locale: lang
  };
  window.CRISP_TOKEN_ID = user.user_id;
  window.CRISP_WEBSITE_ID = "0fedd57b-c655-402e-b6f9-502131085dc9";
  (function () {
    const d = document;
    const s: any = d.createElement("script");
    s.src = "https://client.crisp.chat/l.js";
    s.async = 1;
    d.getElementsByTagName("head")[0].appendChild(s);
  })();
}

export function resetChat() {
  window.CRISP_TOKEN_ID = "";
  window.$crisp.push(["do", "session:reset"]);
}
