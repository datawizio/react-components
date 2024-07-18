import * as React from "react";
import { useContext, useMemo } from "react";
import { Menu, Dropdown, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import ConfigContext from "../ConfigProvider/context";
import { IHelpMenu } from "./types";

const HelpMenu: React.FC<IHelpMenu> = ({
  onTutorialLinkClick,
  onHelperClick,
  onVisibleChange,
  tourMenu,
  tutorialDisabled,
  helperDisabled,
  btnDisabled,
  visible
}) => {
  const { translate } = useContext(ConfigContext);

  const menu = useMemo(() => {
    return (
      <Menu theme="light" className="help-menu-dropdown">
        {onTutorialLinkClick && (
          <Menu.Item
            key="1"
            disabled={tutorialDisabled}
            onClick={onTutorialLinkClick}
          >
            {translate("READ_TUTORIAL")}
          </Menu.Item>
        )}
        {onHelperClick && (
          <Menu.Item key="2" disabled={helperDisabled} onClick={onHelperClick}>
            {translate("BES_HELPER")}
          </Menu.Item>
        )}
        {tourMenu}
      </Menu>
    );
  }, [
    onTutorialLinkClick,
    tutorialDisabled,
    translate,
    onHelperClick,
    helperDisabled,
    tourMenu
  ]);

  const visibleProps = typeof visible === "boolean" ? { visible } : {};

  return (
    <>
      {(onTutorialLinkClick || onHelperClick || tourMenu) && (
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
            disabled={btnDisabled}
          ></Button>
        </Dropdown>
      )}
    </>
  );
};

export default HelpMenu;
