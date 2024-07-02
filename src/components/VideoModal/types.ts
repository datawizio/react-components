import { ModalProps } from "antd";
import { PlayerState } from "video-react";
import { Source } from "../Player/types";
import { ButtonProps as AntButtonProps } from "antd/lib/button";
import { Dispatch, SetStateAction } from "react";

export type VoidCallback = () => void;

export type VideoStateChangeCallback = (playerState: PlayerState) => void;

export interface ThumbnailProps {
  url: string;
  onClick?: VoidCallback;
}

export interface VideoModalProps {
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  thumbnail?: string;
  buttonProps?: AntButtonProps & {
    text: string;
    border?: boolean;
    highlight?: boolean;
  };
  source: Source;
  modalProps?: ModalProps;
  onVideoStateChange?: VideoStateChangeCallback;
  onThumbnailClick?: () => void;
}
