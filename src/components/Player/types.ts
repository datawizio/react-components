import { PlayerReference } from "video-react";
export interface Source {
  src: string;
  type: string;
}

export interface PlayerRef {
  play: () => void;
  pause: () => void;
  target: PlayerReference;
}
