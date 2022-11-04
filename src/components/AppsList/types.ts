export interface IClient {
  client_id: number;
  name: string;
  is_active: boolean;
}

export interface IButtonClickParams {
  appId: number;
  url: string;
  allowed: boolean;
}

export type onAppClick = (clientId: number, params: IButtonClickParams) => void;

export interface CardAppProps {
  app_id: number;
  name: string;
  logo: string;
  dark_logo: string;
  host: string;
  path: string;
  description: string;
  allowed?: boolean;
  clients?: IClient[];
  onButtonClick?: onAppClick;
  buttonText?: string;
  showButton?: boolean;
}

export interface AppsListProps {
  apps: CardAppProps[];
  loading?: boolean;
  onSelect?: onAppClick;
}
