import React, { useState, useContext } from "react";

import { Card } from "antd";
import Select from "../Select";

import Button from "../Button";

import ConfigContext from "../ConfigProvider/context";

import "./index.less";

export interface CardAppProps {
  title: string;
  logo: string;
  description: string;
  clients?: { id: number; name: string }[];
  onButtonClick?: (client: number) => void;
  buttonText?: string;
}

const CardApp: React.FC<CardAppProps> = ({
  title,
  logo,
  description,
  clients,
  buttonText,
  onButtonClick
}) => {
  const { translate } = useContext(ConfigContext);
  const [client, setClient] = useState<number>();

  const handleChangeClient = (value: any) => {
    setClient(value);
  };

  const handleButtonClick = () => {
    onButtonClick(client);
  };

  return (
    <Card className="card-app">
      <div className="card-app-logo">
        {logo && (
          <img
            src={`/static/images/apps/${logo}.png`}
            srcSet={`/static/images/apps/${logo}.png 1x, /static/images/apps/${logo}@2x.png 2x`}
            alt={title}
          />
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
      <div className="card-app-actions">
        <Button type={"primary"} block onClick={handleButtonClick}>
          {buttonText ? buttonText : translate("GO_OVER")}
        </Button>
      </div>
    </Card>
  );
};

export default CardApp;
