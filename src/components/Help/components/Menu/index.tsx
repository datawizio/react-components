import * as React from "react";
import { useContext, useMemo } from "react";
import { Menu, Dropdown, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import ConfigContext from "../../../ConfigProvider/context";
import "./index.less";

export interface IHelpMenu {
  onTutorialClick: () => void;
  onHelperClick: () => void;
  onVisibleChange: (visible: boolean) => void;
  tourMenu?: React.ReactElement;
  visible?: boolean;
}

const HelpMenu: React.FC<IHelpMenu> = ({
  onTutorialClick,
  onHelperClick,
  onVisibleChange,
  tourMenu,
  visible
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
        {onHelperClick && (
          <Menu.Item key="2" onClick={onHelperClick}>
            {translate("BES_HELPER")}
          </Menu.Item>
        )}
        {tourMenu && tourMenu}
      </Menu>
    );
  }, [onTutorialClick, onHelperClick, translate, tourMenu]);

  const visibleProps = typeof visible === "boolean" ? { visible } : {};

  return (
    <>
      {(onTutorialClick || onHelperClick || tourMenu) && (
        <Dropdown
          {...visibleProps}
          onVisibleChange={onVisibleChange}
          overlay={menu}
          trigger={["click"]}
          placement="bottomRight"
        >
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
