import * as React from "react";
import { useContext, useMemo } from "react";
import { Menu, Dropdown, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import ConfigContext from "../../../ConfigProvider/context";
import "./index.less";

export interface IHelpMenu {
  onTutorialClick: () => void;
  onSupportClick: () => void;
  onServiceUpdateClick: () => void;
  onHelperClick: () => void;
}

const HelpMenu: React.FC<IHelpMenu> = ({
  onTutorialClick,
  onSupportClick,
  onHelperClick,
  onServiceUpdateClick
}) => {
  const { translate } = useContext(ConfigContext);

  const menu = useMemo(() => {
    return (
      <Menu theme="light" className="help-menu-dropdown">
        <Menu.Item key="1" onClick={onTutorialClick}>
          {translate("READ_TUTORIAL")}
        </Menu.Item>
        <Menu.Item key="2" onClick={onSupportClick}>
          {translate("SUPPORT")}
        </Menu.Item>
        <Menu.Item key="3" onClick={onServiceUpdateClick}>
          {translate("SERVICE_UPDATE")}
        </Menu.Item>
        {onHelperClick && (
          <Menu.Item key="4" onClick={onHelperClick}>
            {translate("BES_HELPER")}
          </Menu.Item>
        )}
      </Menu>
    );
  }, [
    onServiceUpdateClick,
    onSupportClick,
    onTutorialClick,
    onHelperClick,
    translate
  ]);

  return (
    <>
      <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
        <Button
          type="link"
          className="help-icon"
          onClick={e => e.preventDefault()}
        >
          <QuestionCircleOutlined />
        </Button>
      </Dropdown>
    </>
  );
};

export default HelpMenu;
