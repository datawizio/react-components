import React, { forwardRef } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Player as VideoReact,
  PlayerReference,
  PlayerProps as VideoReactProps,
  BigPlayButton,
  LoadingSpinner,
  ControlBar
} from "video-react";
import { Source } from "./types";

interface PlayerProps extends VideoReactProps {
  source: Source | Source[];
  prefixCls?: string;
  fullscreen?: boolean;
}

const Player = forwardRef<PlayerReference, PlayerProps>(
  ({ source, prefixCls, fullscreen, ...restProps }, ref) => {
    const videoSource = Array.isArray(source) ? (
      source.map(({ src, type }) => (
        <source key={`source-${uuidv4()}`} src={src} type={type} />
      ))
    ) : (
      <source src={source.src} type={source.type} />
    );

    return (
      <VideoReact ref={ref} preload="auto" fluid {...restProps}>
        {videoSource}
        <BigPlayButton
          position="center"
          className={`${prefixCls}-big-play-button`}
        />
        <LoadingSpinner />
        <ControlBar className={`${prefixCls}-control-bar`} />
      </VideoReact>
    );
  }
);

export default Player;
