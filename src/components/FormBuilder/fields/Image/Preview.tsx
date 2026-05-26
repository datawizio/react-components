import React, { useContext, useEffect, useMemo } from "react";
import clsx from "clsx";
import ConfigContext from "../../../ConfigProvider/context";

import { Modal } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

export interface PreviewProps {
  value: string | File;
  onDelete: () => void;
  disabled?: boolean;
}

export const Preview: React.FC<PreviewProps> = ({
  value,
  onDelete,
  disabled
}) => {
  const { translate } = useContext(ConfigContext);

  const objectUrl = useMemo(
    () => (value instanceof File ? URL.createObjectURL(value) : null),
    [value]
  );

  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  const src = objectUrl ?? (value as string);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (disabled) return;
    e.stopPropagation();

    Modal.confirm({
      title: translate("DELETE_CONFIRM_PHOTO"),
      icon: <ExclamationCircleOutlined />,
      okText: translate("YES"),
      cancelText: translate("CANCEL"),
      onOk: () => onDelete(),
      onCancel: () => void 0
    });
  };

  return (
    <div className="ant-upload-list ant-upload-list-picture-card">
      <div className="ant-upload-list-picture-card-container">
        <span>
          <div
            className={clsx(
              "ant-upload-list-item ant-upload-list-item-done ant-upload-list-item-list-type-picture-card",
              disabled && "preview-disabled"
            )}
            onClick={handleClick}
          >
            <div className="ant-upload-list-item-info">
              <span>
                <img
                  src={src}
                  alt="Preview"
                  className="ant-upload-list-item-image"
                />
              </span>
            </div>
            {!disabled && (
              <span className="ant-upload-list-item-actions">
                <DeleteOutlined />
              </span>
            )}
          </div>
        </span>
      </div>
    </div>
  );
};
