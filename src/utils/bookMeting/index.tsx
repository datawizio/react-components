import React from "react";
import { Modal } from "antd";
import i18n from "i18next";
import "./index.less";

const defaultMeetingSrc = "https://meetings-eu1.hubspot.com/meetings/olena-dziuban/bes-presentation?embed=true";

const openBookMeetingModal = (src: string = defaultMeetingSrc) => {

  const hubSpotScript: HTMLScriptElement = document.createElement("script");
  hubSpotScript.src = "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";
  hubSpotScript.async = true;
  document.head.appendChild(hubSpotScript);

  Modal.info({
    closable: true,
    maskClosable: true,
    okButtonProps: {
      hidden: true
    },
    icon: null,
    width: 1000,
    className: "book-meeting-modal",
    style: {
      top: 20
    },
    content: (
      <div className="book-meeting-modal-container">
        <span className="book-meeting-modal-title">{i18n.t("BOOK_MEETING_TITLE")}</span>
        <div
          className="meetings-iframe-container"
          data-src={src}
        ></div>
      </div>
    ),
    onOk: () => {
      document.head.removeChild(hubSpotScript);
    }
  })
}

export default openBookMeetingModal;