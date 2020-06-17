import React, { useContext } from "react";

import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import ConfigContext from "../../../ConfigProvider/context";

export interface PreviewProps {
  value: string;
  onDelete: () => void;
}

export const Preview: React.FC<PreviewProps> = ({ value, onDelete }) => {
  const { translate } = useContext(ConfigContext);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    Modal.confirm({
      title: translate("DELETE_CONFIRM_PHOTO"),
      icon: <ExclamationCircleOutlined />,
      okText: translate("YES"),
      cancelText: translate("CANCEL"),
      onOk() {
        onDelete();
      },
      onCancel() {}
    });
  };

  return (
    <div className="ant-upload-list ant-upload-list-picture-card">
      <div className="ant-upload-list-picture-card-container">
        <span>
          <div
            className="ant-upload-list-item ant-upload-list-item-done ant-upload-list-item-list-type-picture-card"
            onClick={handleClick}
          >
            <div className="ant-upload-list-item-info">
              <span>
                <img
                  src={value}
                  alt="Preview"
                  className="ant-upload-list-item-image"
                />
              </span>
            </div>
            <span className="ant-upload-list-item-actions">
              <DeleteOutlined />
            </span>
          </div>
        </span>
      </div>
    </div>
  );
};
