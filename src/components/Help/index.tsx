import * as React from "react";
import { useCallback, useState } from "react";
import HelpMenu from "./components/Menu";
import SupportModal from "./components/SupportModal";
import { ISupportFormData } from "./components/SupportModal/types";
import "./index.less";

export interface IHelp {
  onSupportModalSubmit?: (data: ISupportFormData) => void;
  onTutorialLinkClick?: () => void;
  onSupportLinkClick?: () => void;
  onServiceUpdateClick?: () => void;
  onHelperClick?: () => void;
  onVisibleChange?: (visible: boolean) => void;
  uploadFileURL?: string;
  tourMenu?: React.ReactElement;
}

const Help: React.FC<IHelp> = ({
  onTutorialLinkClick,
  onSupportLinkClick,
  onServiceUpdateClick,
  onSupportModalSubmit,
  onHelperClick,
  onVisibleChange,
  uploadFileURL,
  tourMenu
}) => {
  const [supportModalVisible, setSupportModalVisible] = useState(false);

  const handleSupportLinkClick = useCallback(() => {
    onSupportLinkClick && onSupportLinkClick();
    setSupportModalVisible(true);
  }, [onSupportLinkClick]);

  return (
    <>
      <HelpMenu
        onTutorialClick={onTutorialLinkClick}
        onSupportClick={handleSupportLinkClick}
        onHelperClick={onHelperClick}
        onServiceUpdateClick={onServiceUpdateClick}
        onVisibleChange={onVisibleChange}
        tourMenu={tourMenu}
      />
      <SupportModal
        uploadFileURL={uploadFileURL}
        visible={supportModalVisible}
        setVisible={setSupportModalVisible}
        onSubmit={onSupportModalSubmit}
      />
      <div className="divider"></div>
    </>
  );
};

export default Help;
