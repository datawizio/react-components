export interface IApplications {
  administrative_solutions: Array<IApp>;
  available_solutions: Array<IApp>;
  other_solutions: Array<{
    name: string;
    applications: Array<IApp>;
  }>;
}

export interface IApp {
  clients: Array<IClient>;
  dark_logo: string;
  description: string;
  host: string;
  id: number;
  is_purchased: boolean;
  logo: string;
  modal: IAppModal;
  name: string;
  path: string;
  progress_bar: { current: number; total: number; };
  tag: string;
  tariff_plan: { id: number; name: string; show_switch_button: boolean; };
}

export interface IClient {
  client_id: number;
  name: string;
  is_active: boolean;
}

export interface IAppModal {
  image: string;
  show_tariff_switch_button: boolean;
  video: string;
}

export type ApplicationsProps = {
  apps: IApplications;
  onPrimaryButtonClick?: (params: PrimaryButtonClickParams) => void;
  onSecondaryButtonClick?: (client: number) => void;
  loading?: boolean;
}

export type PrimaryButtonClickParams = {
  client: { id: number; name: string; };
  app: { id: string; name: string };
  url: string;
  is_purchased: boolean;
  modal: IAppModal;
}

export type ApplicationProps = {
  app: IApp;
  tagColor?: "green" | "grey";
  onPrimaryButtonClick?: (params: PrimaryButtonClickParams) => void;
  onSecondaryButtonClick?: (client: number) => void;
}