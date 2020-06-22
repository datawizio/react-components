import React from "react";
import { FieldImageProps } from "../../types";

import { Form } from "antd";
import { Image } from "./Image";

import "./styles.less";

export const FieldImage: React.FC<FieldImageProps> = React.memo(
  ({ name, label, rules, placeholder, onChange }) => {
    return (
      <Form.Item name={name} label={label} rules={rules}>
        <Image onChange={onChange} name={name} placeholder={placeholder} />
      </Form.Item>
    );
  }
);
