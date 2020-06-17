import React from "react";

import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";

export interface PreviewProps {
  value: string;
  onDelete: () => void;
}

export const Preview: React.FC<PreviewProps> = ({ value, onDelete }) => {
  const { t } = useTranslation();

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    Modal.confirm({
      title: t("DELETE_CONFIRM_PHOTO"),
      icon: <ExclamationCircleOutlined />,
      okText: t("YES"),
      cancelText: t("CANCEL"),
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
