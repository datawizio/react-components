import React, { useEffect } from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import "./index.less";

const SRC = "https://assets.calendly.com/assets/external/widget.js";

const APP_SRC_LIST = {
  "BES": "https://calendly.com/olena-dziuban-datawiz/product-demo-bi",
  "SM": "https://calendly.com/olena-dziuban-datawiz/product-demo-bi"
};

interface BookMeetingModalProps {
  visible: boolean;
  titleKey?: string;
  width: number;
  onClose: () => void;
  app?: keyof typeof APP_SRC_LIST;
}

const BookMeetingModal: React.FC<BookMeetingModalProps> = ({
  visible,
  onClose,
  width,
  app = "BES",
  titleKey = "BOOK_MEETING_TITLE"
}) => {
  const { t } = useTranslation();

  const script: HTMLScriptElement = document.createElement("script");
  script.src = SRC;
  script.async = true;
  document.head.appendChild(script);

  const handleModalClose = () => {
    onClose();
  };

  useEffect(() => {
    return () => {
      document.head.removeChild(script);
    };
  }, [script]);

  return (
    <Modal
      centered
      className="book-meeting-modal"
      visible={visible}
      closable={true}
      maskClosable={false}
      width={width}
      footer={null}
      destroyOnClose={true}
      okButtonProps={{ hidden: true }}
      onCancel={handleModalClose}
    >
      <div className="book-meeting-modal-container">
        <span className="book-meeting-modal-title">{t(titleKey)}</span>
        <div
          className="calendly-inline-widget"
          data-url={`${APP_SRC_LIST[app]}?text_color=000&primary_color=582eb2`}
        ></div>
      </div>
    </Modal>
  );
};

export default BookMeetingModal;
