import React from "react";

import Select from "../Select";

import { SelectValue } from "antd/lib/select";

import "./index.less";
import clsx from "clsx";

export interface ClientSelectProps {
  clients: [{ id: number; name: string }];
  client: number;
  theme?: "dark" | "light";
  onChange?: (url: string) => void;
}

const ClientSelect: React.FC<ClientSelectProps> = ({
  clients,
  client,
  theme,
  onChange
}) => {
  const handleChange = (value: SelectValue) => {
    const arr = window.location.pathname.split("/").slice(3);
    onChange && onChange(`/c/${value}/${arr.join("/")}`);
  };

  const className = clsx({
    "client-select": true,
    "dw-dark": theme === "dark"
  });

  return (
    <>
      {clients.length === 1 ? (
        clients[0].name
      ) : (
        <Select
          value={client}
          showSearch
          optionFilterProp="label"
          onChange={handleChange}
          className={className}
        >
          {clients.map(client => (
            <Select.Option
              key={client.id}
              value={client.id}
              label={client.name}
            >
              {client.name}
            </Select.Option>
          ))}
        </Select>
      )}
      <div className="divider"></div>
    </>
  );
};

export default ClientSelect;
