import * as React from "react";
import HelpMenu from "./components/Menu";
import "./index.less";

export interface IHelp {
  onTutorialLinkClick?: () => void;
  onServiceUpdateClick?: () => void;
  onHelperClick?: () => void;
  onVisibleChange?: (visible: boolean) => void;
  tourMenu?: React.ReactElement;
  visible?: boolean;
}

const Help: React.FC<IHelp> = ({
  onTutorialLinkClick,
  onServiceUpdateClick,
  onHelperClick,
  onVisibleChange,
  tourMenu,
  visible
}) => {
  return (
    <>
      <HelpMenu
        onTutorialClick={onTutorialLinkClick}
        onHelperClick={onHelperClick}
        onServiceUpdateClick={onServiceUpdateClick}
        onVisibleChange={onVisibleChange}
        tourMenu={tourMenu}
        visible={visible}
      />
      <div className="divider"></div>
    </>
  );
};

export default Help;
