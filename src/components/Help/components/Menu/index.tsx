import * as React from "react";
import { useContext, useMemo } from "react";
import { Menu, Dropdown, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import ConfigContext from "../../../ConfigProvider/context";
import "./index.less";

export interface IHelpMenu {
  onTutorialClick: () => void;
  onSupportClick: () => void;
}

const HelpMenu: React.FC<IHelpMenu> = ({ onTutorialClick, onSupportClick }) => {
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
      </Menu>
    );
  }, []);

  return (
    <>
      <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
        <Button type="link" className="help-icon" onClick={e => e.preventDefault()}>
          <QuestionCircleOutlined />
        </Button>
      </Dropdown>
    </>
  );
};

export default HelpMenu;