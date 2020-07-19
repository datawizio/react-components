import React, { useState, useContext } from "react";

import { Card, Col } from "antd";
import Select from "../Select";
import Button from "../Button";

import ConfigContext from "../ConfigProvider/context";

import "./index.less";

export interface CardAppProps {
  app_id: number;
  name: string;
  logo: string;
  host: string;
  path: string;
  description: string;
  allowed?: boolean;
  clients?: { id: number; name: string }[];
  onButtonClick?: (
    clientId: number,
    { appId: number, url: string, allowed: boolean }
  ) => void;
  buttonText?: string;
  showButton?: boolean;
}

export const App: React.FC<CardAppProps> = ({
  app_id,
  name,
  logo,
  description,
  clients,
  host,
  path,
  allowed,
  showButton = true,
  onButtonClick
}) => {
  const { translate } = useContext(ConfigContext);
  const [client, setClient] = useState<number>();

  const handleChangeClient = (value: any) => {
    setClient(value);
  };

  const getClient = (client: number) => {
    if (client) return client;
    if (clients && clients.length > 0) return clients[0].id;
    return null;
  };

  const handleButtonClick = () => {
    const url = `${host ? host : ""}${path ? path : ""}`;
    onButtonClick(getClient(client), { appId: app_id, url, allowed });
  };

  return (
    <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={6}>
      <Card className="card-app">
        <div className="card-app-logo">
          {logo ? (
            <img src={logo} alt={name} />
          ) : (
            <div className="card-app-name">{name}</div>
          )}
        </div>
        <div className="card-app-description">{translate(description)}</div>
        {clients && clients.length > 1 && (
          <div className="card-app-clients">
            <Select
              placeholder={translate("SELECT_CLIENT")}
              showSearch
              optionFilterProp="label"
              onChange={handleChangeClient}
              value={client}
            >
              {clients.map(client => (
                <Select.Option key={client.id} value={client.id}>
                  {client.name}
                </Select.Option>
              ))}
            </Select>
          </div>
        )}

        {showButton && (
          <div className="card-app-actions">
            <Button type={"primary"} block onClick={handleButtonClick}>
              {translate(allowed ? "GO_OVER" : "LEARN_MORE")}
            </Button>
          </div>
        )}
      </Card>
    </Col>
  );
};
