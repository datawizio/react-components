import * as React from "react";

export interface IHelpMenu {
  onTutorialLinkClick?: () => void;
  onHelperClick?: () => void;
  onVisibleChange?: (visible: boolean) => void;
  tourMenu?: React.ReactElement;
  visible?: boolean;
  tutorialDisabled?: boolean;
  helperDisabled?: boolean;
  btnDisabled?: boolean;
}