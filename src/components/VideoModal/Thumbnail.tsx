import React, { FC } from "react";

interface ThumbnailProps {
  url: string;
  onClick?: () => void;
}

export const Thumbnail: FC<ThumbnailProps> = ({ url, onClick }) => {
  return (
    <div className="modal-player_thumbnail">
      <img
        src={url}
        alt="video-thumbnail"
        className="modal-player_thumbnail-image"
      />
      <div className="modal-player_thumbnail-play-button" onClick={onClick}>
        <div className="modal-player_thumbnail-play-button_icon"></div>
      </div>
    </div>
  );
};
