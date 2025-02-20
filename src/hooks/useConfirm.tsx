import { Modal, ModalFuncProps } from "antd";
import React, { useCallback, useContext } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import ConfigContext from "../components/ConfigProvider/context";

export const useConfirm = () => {
  const { translate } = useContext(ConfigContext);

  return useCallback(
    (
      msg: string | React.ReactNode,
      okFn: any,
      content?: string,
      options?: ModalFuncProps
    ) => {
      Modal.confirm({
        title: typeof msg === "string" ? translate(msg) : msg,
        content,
        icon: <ExclamationCircleOutlined />,
        okText: translate("YES"),
        cancelText: translate("CANCEL"),
        onOk() {
          return okFn();
        },
        onCancel() {},
        ...options
      });
    },
    [translate]
  );
};
