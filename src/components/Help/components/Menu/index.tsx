import * as React from "react";
import { useContext, useMemo } from "react";
import { Menu, Dropdown, Button } from "antd";
import {
  CustomerServiceOutlined,
  QuestionCircleOutlined
} from "@ant-design/icons";
import ConfigContext from "../../../ConfigProvider/context";
import "./index.less";

export interface IHelpMenu {
  onTutorialClick: () => void;
  onSupportClick: () => void;
  onServiceUpdateClick: () => void;
  onHelperClick: () => void;
  tourMenu?: React.ReactElement;
}

const HelpMenu: React.FC<IHelpMenu> = ({
  onTutorialClick,
  onSupportClick,
  onHelperClick,
  onServiceUpdateClick,
  tourMenu
}) => {
  const { translate } = useContext(ConfigContext);

  const menu = useMemo(() => {
    return (
      <Menu theme="light" className="help-menu-dropdown">
        {onTutorialClick && (
          <Menu.Item key="1" onClick={onTutorialClick}>
            {translate("READ_TUTORIAL")}
          </Menu.Item>
        )}
        {onServiceUpdateClick && (
          <Menu.Item key="2" onClick={onServiceUpdateClick}>
            {translate("SERVICE_UPDATE")}
          </Menu.Item>
        )}
        {onHelperClick && (
          <Menu.Item key="3" onClick={onHelperClick}>
            {translate("BES_HELPER")}
          </Menu.Item>
        )}
        {tourMenu && tourMenu}
      </Menu>
    );
  }, [
    onServiceUpdateClick,
    onTutorialClick,
    onHelperClick,
    translate,
    tourMenu
  ]);

  return (
    <>
      <Button
        type="link"
        className="help-icon support-btn"
        onClick={onSupportClick}
        icon={<CustomerServiceOutlined />}
      >
        {translate("SUPPORT")}
      </Button>
      {(onTutorialClick ||
        onServiceUpdateClick ||
        onHelperClick ||
        tourMenu) && (
        <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
          <Button
            type="link"
            className="help-icon teaching-btn"
            onClick={e => e.preventDefault()}
            icon={<QuestionCircleOutlined />}
          >
            {translate("TEACHING")}
          </Button>
        </Dropdown>
      )}
    </>
  );
};

export default HelpMenu;
