import * as React from "react";
import HelpMenu from "./components/Menu";
import "./index.less";

export interface IHelp {
  onTutorialLinkClick?: () => void;
  onServiceUpdateClick?: () => void;
  onHelperClick?: () => void;
  onVisibleChange?: (visible: boolean) => void;
  tourMenu?: React.ReactElement;
}

const Help: React.FC<IHelp> = ({
  onTutorialLinkClick,
  onServiceUpdateClick,
  onHelperClick,
  onVisibleChange,
  tourMenu
}) => {
  return (
    <>
      <HelpMenu
        onTutorialClick={onTutorialLinkClick}
        onHelperClick={onHelperClick}
        onServiceUpdateClick={onServiceUpdateClick}
        onVisibleChange={onVisibleChange}
        tourMenu={tourMenu}
      />
      <div className="divider"></div>
    </>
  );
};

export default Help;
