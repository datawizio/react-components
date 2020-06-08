// TODO Дописать сторис к этому компонету

import * as React from "react";

import { Modal as AntdModal } from "antd";
import { ModalProps as AntdModalProps } from "antd/lib/modal";

import "./index.less";

export interface ModalProps extends AntdModalProps {}

const Modal: React.FC<ModalProps> = props => {
  return <AntdModal {...props} />;
};

export default Modal;
