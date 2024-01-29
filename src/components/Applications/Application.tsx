import React, { useContext, useState } from "react";

import { Card, Badge, Progress, Tooltip } from "antd";
import ConfigContext from "../ConfigProvider/context";
import Select from "../Select";
import Button from "../Button";
import { ApplicationProps, IClient } from "./models";
import "./index.less";

export const Application: React.FC<ApplicationProps> = ({ app, tagColor, onPrimaryButtonClick, onSecondaryButtonClick }) => {

  const { translate } = useContext(ConfigContext);
  const showClientSelect = app.path ? app.path.match(":client_id") !== null : false;
  const [client, setClient] = useState<number>();
  const handleChangeClient = (value: number) => setClient(value);
  const getClient = (client: number): { id: number; name: string; } => {
    if (client) {
      return {
        id: client,
        name: app.clients.find((c: IClient) => c.client_id === client)?.name
      };
    }
    if (app.clients?.length > 0) {
      return {
        id: app.clients[0].client_id,
        name: app.clients[0].name
      };
    }
    return {
      id: null,
      name: null
    };
  };

  const handlePrimaryButtonClick = () => {
    const url = `${app.host ? app.host : ""}${app.path ? app.path : ""}`;

    onPrimaryButtonClick({
      client: getClient(client),
      app: { id: String(app.id), name: app.name },
      url: url,
      is_purchased: app.is_purchased,
      modal: app.modal
    })
  };

  const handleSecondaryButtonClick = () => {
    onSecondaryButtonClick(getClient(client).id);
  }

  return (
    <Card className="applications-card">
      {
        (app.tag || app.tariff_plan) &&
        <div className={`applications-card-tag applications-card-tag-${tagColor ?? "grey"}`}>
          {app.tag ? app.tag : translate(app.tariff_plan.name)}
        </div>
      }
      {
        app.logo ?
          <div className="applications-card-logo">
            <img src={window.theme === "dark" ? app.dark_logo : app.logo} alt={app.name} />
          </div> :
          <div className="applications-card-name">
            <span>{translate(app.name)}</span>
          </div>
      }
      <div className="applications-card-description">{app.description ? translate(app.description) : ""}</div>
      {
        app.progress_bar &&
        <div className="applications-card-progress">
          <Tooltip title={translate(
            "LOADED_ENTITIES_HINT",
            { current: app.progress_bar.current, total: app.progress_bar.total }
          )}>
            <Progress
              showInfo={false}
              status={"success"}
              percent={app.progress_bar.current / app.progress_bar.total * 100 }
            />
          </Tooltip>
        </div>
      }
      {
        app.tariff_plan?.show_switch_button &&
        <div className="applications-card-actions">
          <Button block onClick={handleSecondaryButtonClick}>
            {translate("CHANGE_TARIFF")}
          </Button>
        </div>
      }
      {
        (showClientSelect && app.is_purchased && app.clients?.length > 1) &&
        <div className="applications-card-clients">
          <Select
            placeholder={translate("SELECT_CLIENT")}
            showSearch
            optionFilterProp="label"
            onChange={handleChangeClient}
            value={client}
            notFoundContent={translate("NO_DATA")}
          >
            {app.clients.map(client => (
              <Select.Option
                key={client.client_id}
                value={client.client_id}
                label={client.name}
              >
                <Badge
                  status="default"
                  color={client.is_active ? "purple" : null}
                />
                {client.name}
              </Select.Option>
            ))}
          </Select>
        </div>
      }
      {
        (app.host || !app.is_purchased) &&
        <div className="applications-card-actions">
          <Button type={"primary"} block onClick={handlePrimaryButtonClick}>
            {translate(app.is_purchased ? "GO_OVER" : "LEARN_MORE")}
          </Button>
        </div>
      }
    </Card>
  )
}