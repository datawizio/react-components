import React, { useMemo } from "react";

import Drawer from "../Drawer";
import Button from "../Button";

export interface DrawerFormProps {
  title: string;
  visible: boolean;
  cancelText: string;
  submitText: string;
  actions: React.ReactElement;
  onClose: () => void;
  onSubmit: () => void;
}

const DrawerForm: React.FC<DrawerFormProps> = ({
  actions,
  title,
  cancelText,
  submitText,
  visible,
  children,
  onClose,
  onSubmit
}) => {
  const internalActions = useMemo(() => {
    return actions ? (
      actions
    ) : (
      <>
        <Button onClick={onClose}>{cancelText}</Button>
        <Button onClick={onSubmit} type="primary">
          {submitText}
        </Button>
      </>
    );
  }, [actions, cancelText, submitText]);
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
