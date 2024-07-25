import React, { useEffect } from "react";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import "./index.less";

const SRC_HUBSPOT =
  "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";

const APP_SRC_LIST = {
  "BES":
    "https://meetings-eu1.hubspot.com/meetings/olena-dziuban/bes-presentation?embed=true",
  "SM": "https://meetings-eu1.hubspot.com/meetings/olena-dziuban/store-manager-presentation?embed=true"
};

interface BookMeetingModalProps {
  visible: boolean;
  app: keyof typeof APP_SRC_LIST;
  titleKey?: string;
  width: number;
  onClose: () => void;
}

const BookMeetingModal: React.FC<BookMeetingModalProps> = ({
  visible,
  app,
  onClose,
  width,
  titleKey = "BOOK_MEETING_TITLE"
}) => {
  const { t } = useTranslation();

  const hubSpotScript: HTMLScriptElement = document.createElement("script");
  hubSpotScript.src = SRC_HUBSPOT;
  hubSpotScript.async = true;
  document.head.appendChild(hubSpotScript);

  const handleModalClose = () => {
    onClose();
  };

  useEffect(() => {
    return () => {
      document.head.removeChild(hubSpotScript);
    };
  }, [hubSpotScript]);

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
        <span className="book-meeting-modal-title">
          {t(titleKey)}
        </span>
        <div
          className="meetings-iframe-container"
          data-src={APP_SRC_LIST[app || "BES"]}
        ></div>
      </div>
    </Modal>
  );
};

export default BookMeetingModal;
