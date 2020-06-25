import React from "react";

import Select from "../Select";

import { SelectValue } from "antd/lib/select";

import "./index.less";

export interface ClientSelectProps {
  clients: [{ id: number; name: string }];
  client: number;
}

const ClientSelect: React.FC<ClientSelectProps> = ({ clients, client }) => {
  const handleChange = (value: SelectValue) => {
    const arr = window.location.pathname.split("/").slice(3);
    window.location.href = `/c/${value}/${arr.join("/")}`;
  };

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
          className="client-select"
        >
          {clients.map(client => (
            <Select.Option key={client.id} value={client.id}>
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
