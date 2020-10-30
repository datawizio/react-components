import React, { useCallback, useContext, useMemo, useState } from "react";
import { Form, Modal, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ConfigContext from "../../../ConfigProvider/context";
import Select from "../../../Select";
import TextArea from "../../../TextArea";
import Button from "../../../Button";
import { subjectsList } from "./subjects";
import { ISupportModal, ISupportFormData } from "./types";
import "./style.less";

const SupportModal: React.FC<ISupportModal> = ({
  onSubmit,
  visible,
  setVisible,
  uploadFileURL
}) => {
  const { translate } = useContext(ConfigContext);

  const defaultState = {
    service: "BES",
    client: null,
    subject: "",
    comment: "",
    uploads: []
  };

  const [formData, setFormData] = useState<ISupportFormData>(defaultState);
  const [filename, setFilename] = useState<string>("");

  const [form] = Form.useForm();

  const fileProps = useMemo(() => {
    return {
      name: "uploaded_data",
      action: uploadFileURL + "&filename=" + filename,
      beforeUpload(file) {
        const isJpgOrPng =
          file.type === "image/jpeg" || file.type === "image/png";
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJpgOrPng) {
          message.error("You can only upload JPG/PNG file!");
        }

        if (!isLt2M) {
          message.error("Image must be smaller than 2MB!");
        }

        if (isJpgOrPng && isLt2M) {
          setFilename(file.name);
        }

        return isJpgOrPng && isLt2M;
      },
      onChange(info) {
        if (info.file.status === "done") {
          const token = info.file.response.upload.token;
          setFormData(prevState => {
            return {
              ...prevState,
              "uploads": [...prevState.uploads, token]
            };
          });
        }
      },
      onRemove(file) {
        const token = file.response.upload.token;
        const idx = formData.uploads.findIndex(item => item === token);
        if (idx === -1) return;
        setFormData(prevState => {
          const nextUploads = [...prevState.uploads];
          nextUploads.splice(idx, 1);
          return {
            ...prevState,
            "uploads": nextUploads
          };
        });
      }
    };
  }, [filename, formData.uploads, uploadFileURL]);

  const handleFieldChange = useCallback((name, value) => {
    setFormData(prevState => {
      return {
        ...prevState,
        [name]: value
      };
    });
  }, []);

  const resetFormData = useCallback(() => {
    setFormData(defaultState);
    form.setFieldsValue(defaultState);
  }, [defaultState, form]);

  const handleSubmit = useCallback(() => {
    setVisible(false);
    onSubmit(formData);
    resetFormData();
  }, [formData, onSubmit, resetFormData, setVisible]);

  const handleCancel = useCallback(() => {
    setVisible(false);
    resetFormData();
  }, [resetFormData, setVisible]);

  const Footer = (
    <Button
      onClick={handleSubmit}
      type="primary"
      disabled={!formData.subject || !formData.comment}
    >
      {translate("SEND")}
    </Button>
  );

  return (
    <>
      <Modal
        title={translate("SUPPORT")}
        centered
        destroyOnClose={true}
        visible={visible}
        footer={Footer}
        onCancel={handleCancel}
      >
        <Form
          name="support_form"
          layout="vertical"
          form={form}
          initialValues={{ ...defaultState, subject: undefined }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="subject"
            label={translate("CHOOSE_PROBLEM")}
            rules={[
              { required: true, message: translate("REQUIRED_FIELD_ERROR") }
            ]}
          >
            <Select
              placeholder={translate("CHOOSE_PROBLEM")}
              onChange={value => handleFieldChange("subject", value)}
            >
              {subjectsList.map(item => (
                <Select.Option key={item} value={item}>
                  {translate(item)}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="comment"
            label={translate("COMMENT")}
            rules={[
              { required: true, message: translate("REQUIRED_FIELD_ERROR") }
            ]}
          >
            <TextArea
              rows={5}
              required
              onChange={e => handleFieldChange("comment", e.target.value)}
            />
          </Form.Item>
          <Upload {...fileProps}>
            <Button icon={<UploadOutlined />}>
              {translate("CLICK_TO_UPLOAD_FILE")}
            </Button>
          </Upload>
        </Form>
      </Modal>
    </>
  );
};

export default SupportModal;
