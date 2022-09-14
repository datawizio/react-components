import { Modal } from "antd";
import React, { FC, useRef, useState } from "react";
import { PlayerReference } from "video-react";
import Player from "../Player";
import { Source } from "../Player/types";
import { Thumbnail } from "./Thumbnail";

interface VideoModalProps {
  thumbnail?: string;
  source: Source;
}

const VideoModal: FC<VideoModalProps> = ({ thumbnail, source }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const player = useRef<PlayerReference>();

  const handleThumbnailClick = () => {
    setModalVisible(true);
    player.current && player.current.play();
  };
  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleClose = () => {
    player.current.pause();
  };

  return (
    <div className="modal-player">
      {thumbnail && (
        <Thumbnail url={thumbnail} onClick={handleThumbnailClick} />
      )}
      <Modal
        visible={modalVisible}
        footer={null}
        title={null}
        centered
        width="80%"
        closeIcon={null}
        maskClosable
        afterClose={handleClose}
        onCancel={handleCancel}
        bodyStyle={{ padding: 0 }}
      >
        <Player
          fullscreen
          prefixCls="player"
          ref={player}
          source={source}
          autoPlay
        />
      </Modal>
    </div>
  );
};

export default VideoModal;
