import { ModalProps } from "antd";
import { PlayerState } from "video-react";
import { Source } from "../Player/types";

export type VoidCallback = () => void;

export type VideoStateChangeCallback = (playerState: PlayerState) => void;

export interface ThumbnailProps {
  url: string;
  onClick?: VoidCallback;
}

export interface VideoModalProps {
  thumbnail?: string;
  source: Source;
  modalProps?: ModalProps;
  onVideoStateChange?: VideoStateChangeCallback;
}
