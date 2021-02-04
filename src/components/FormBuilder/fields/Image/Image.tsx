import React, { useContext } from "react";
import { ImageProps } from "../../types";
import { Upload, message } from "antd";
import { RcFile } from "antd/lib/upload";
import { PlusOutlined } from "@ant-design/icons";
import { Preview } from "./Preview";
import ImgCrop from "antd-img-crop";
import ConfigContext from "../../../ConfigProvider/context";

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

export const Image: React.FC<ImageProps> = ({
  name,
  value,
  placeholder,
  onChange
}) => {
  const { translate } = useContext(ConfigContext);

  const upload = (file: RcFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result && onChange)
        onChange({ name, value: reader.result as string });
    };
    return "";
  };

  const handleDelete = () => {
    onChange && onChange({ name, value: null });
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
      shape="round"
      modalTitle={translate("EDIT_IMAGE")}
      modalOk={translate("SUBMIT")}
      modalCancel={translate("CANCEL")}
    >
      <Upload.Dragger
        beforeUpload={beforeUpload}
        action={upload}
        listType="picture-card"
        showUploadList={false}
        className="field-image-upload-container"
        customRequest={() => {}}
      >
        {uploadButton}
      </Upload.Dragger>
    </ImgCrop>
  );
};
