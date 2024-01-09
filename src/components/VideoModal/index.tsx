import { Modal } from "antd";
import React, { FC, useEffect, useRef, useState } from "react";
import { PlayerReference } from "video-react";
import { VideoModalProps } from "./types";
import Player from "../Player";
import { Thumbnail } from "./Thumbnail";
import Button from "../Button";

const VideoModal: FC<VideoModalProps> = ({
  thumbnail,
  buttonProps,
  source,
  modalProps,
  onThumbnailClick,
  onVideoStateChange
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const player = useRef<PlayerReference>();

  useEffect(() => {
    if (player.current) {
      player.current.subscribeToStateChange(playerState => {
        if (playerState.ended) {
          setModalVisible(false);
        }
        onVideoStateChange && onVideoStateChange(playerState);
      });
    }
  });

  const handleThumbnailClick = () => {
    setModalVisible(true);
    player.current && player.current.play();
    onThumbnailClick && onThumbnailClick();
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
      {buttonProps && (
        <Button {...buttonProps} onClick={handleThumbnailClick}>
          {buttonProps.text}
        </Button>
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
