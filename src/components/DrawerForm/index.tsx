import React, { useMemo, useContext } from "react";

import Drawer from "../Drawer";
import Button from "../Button";
import ConfigContext from "../ConfigProvider/context";

export interface DrawerFormProps {
  title: string;
  visible: boolean;
  actions?: React.ReactElement;
  onClose: () => void;
  onSubmit: () => void;
}

const DrawerForm: React.FC<DrawerFormProps> = ({
  actions,
  title,
  visible,
  children,
  onClose,
  onSubmit
}) => {
  const { translate } = useContext(ConfigContext);

  const internalActions = useMemo(() => {
    return actions ? (
      actions
    ) : (
      <>
        <Button onClick={onClose}>{translate("CLOSE")}</Button>
        <Button onClick={onSubmit} type="primary">
          {translate("SUBMIT")}
        </Button>
      </>
    );
    //eslint-disable-next-line
  }, [actions, translate]);
  return (
    <Drawer
      title={title}
      width={500}
      onClose={onClose}
      visible={visible}
      actions={internalActions}
    >
      {children}
    </Drawer>
  );
};

export default DrawerForm;
