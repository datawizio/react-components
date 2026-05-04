import React, { useContext } from "react";
import clsx from "clsx";
import ImgCrop from "antd-img-crop";
import ConfigContext from "../../../ConfigProvider/context";
import { Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Preview } from "./Preview";

import type { RcFile } from "antd/es/upload";
import type { ImageProps } from "../../types";

const MAX_IMAGE_SIZE_MB = 2;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png"]);

function beforeUpload(file: RcFile, maxSize: number) {
  const isAllowedType = ALLOWED_IMAGE_TYPES.has(file.type);
  if (!isAllowedType) {
    message.error("You can only upload JPG/PNG file!");
  }

  const isAllowedSize = file.size / 1024 / 1024 <= maxSize;
  if (!isAllowedSize) {
    message.error(`Image must be smaller than ${maxSize}MB!`);
  }

  return isAllowedType && isAllowedSize;
}

export const Image: React.FC<ImageProps> = ({
  name,
  value,
  placeholder,
  onChange,
  maxFileSize = MAX_IMAGE_SIZE_MB,
  shape = "round",
  ...props
}) => {
  const { translate } = useContext(ConfigContext);

  const upload = (file: RcFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result && onChange) {
        onChange({ name, value: reader.result as string });
      }
    };
    return "";
  };

  const handleDelete = () => {
    onChange?.({ name, value: null });
  };

  const uploadButton = value ? (
    <Preview value={value} onDelete={handleDelete} />
  ) : (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">{placeholder}</div>
    </div>
  );

  return (
    <ImgCrop
      shape={shape}
      modalTitle={translate("EDIT_IMAGE")}
      modalOk={translate("SUBMIT")}
      modalCancel={translate("CANCEL")}
      {...props}
    >
      <Upload.Dragger
        beforeUpload={file => beforeUpload(file, maxFileSize)}
        action={upload}
        listType="picture-card"
        showUploadList={false}
        className={clsx("field-image-upload-container", `crop-shape-${shape}`)}
        customRequest={() => void 0}
      >
        {uploadButton}
      </Upload.Dragger>
    </ImgCrop>
  );
};
