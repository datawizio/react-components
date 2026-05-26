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

export const Image: React.FC<ImageProps> = ({
  name,
  value,
  disabled,
  placeholder,
  onChange,
  maxFileSize = MAX_IMAGE_SIZE_MB,
  shape = "round",
  saveAs = "base64",
  ...props
}) => {
  const { translate } = useContext(ConfigContext);

  const beforeUpload = (file: RcFile, sizeLimit: number) => {
    const isAllowedType = ALLOWED_IMAGE_TYPES.has(file.type);
    const isAllowedSize = file.size / 1024 / 1024 <= sizeLimit;

    if (!isAllowedType) {
      void message.error(translate("INVALID_FORMAT"));
    }

    if (!isAllowedSize) {
      void message.error(
        translate("FILE_TOO_LARGE", {
          file_name: file.name,
          size: sizeLimit
        })
      );
    }

    return isAllowedType && isAllowedSize;
  };

  const upload = (file: RcFile) => {
    if (saveAs === "file") {
      onChange?.({ name, value: file });
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result && onChange) {
          onChange({ name, value: reader.result as string });
        }
      };
    }
    return "";
  };

  const handleDelete = () => {
    onChange?.({ name, value: null });
  };

  const uploadButton = value ? (
    <Preview value={value} onDelete={handleDelete} disabled={disabled} />
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
        disabled={disabled}
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
