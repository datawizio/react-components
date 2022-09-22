import { Modal } from "antd";
import React, { FC, useEffect, useRef, useState } from "react";
import { PlayerReference } from "video-react";
import { ModalProps } from "../Modal";
import Player from "../Player";
import { Source } from "../Player/types";
import { Thumbnail } from "./Thumbnail";

interface VideoModalProps {
  thumbnail?: string;
  source: Source;
  modalProps?: ModalProps;
}

const VideoModal: FC<VideoModalProps> = ({ thumbnail, source, modalProps }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const player = useRef<PlayerReference>();

  useEffect(() => {
    if (player.current) {
      player.current.subscribeToStateChange(playerState => {
        if (playerState.ended) {
          setModalVisible(false);
        }
      });
    }
  });

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
        {...modalProps}
        visible={modalVisible}
        footer={null}
        title={null}
        centered
        width="80%"
        closeIcon={null}
        closable={false}
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
