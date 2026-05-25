import React from "react";
import { Form } from "antd";
import { Image } from "./Image";

import type { FieldImageProps } from "../../types";

import "./styles.less";

export const FieldImage: React.FC<FieldImageProps> = React.memo(
  ({ name, label, rules, placeholder, onChange, ...props }) => {
    return (
      <Form.Item name={name} label={label} rules={rules}>
        <Image
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          {...props}
        />
      </Form.Item>
    );
  }
);
