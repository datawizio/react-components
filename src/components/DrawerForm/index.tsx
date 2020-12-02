import React, { useMemo, useContext, useEffect } from "react";

import { Form } from "antd";
import Drawer from "../Drawer";
import Button from "../Button";
import Loader from "../Loader";

import ConfigContext from "../ConfigProvider/context";

export interface DrawerFormProps {
  title: string;
  visible: boolean;
  actions?: React.ReactElement;
  className?: string;
  form?: any;
  hideRequiredMark?: boolean;
  formStore?: any;
  loading?: boolean;
  style?: object;
  width?: number;
  onClose?: () => void;
  onSubmit?: () => void;
}

const noop = () => {};

const DrawerForm: React.FC<DrawerFormProps> = ({
  actions,
  className,
  title,
  style,
  visible,
  hideRequiredMark,
  children,
  form,
  formStore,
  loading,
  width,
  onClose,
  onSubmit
}) => {
  const { translate } = useContext(ConfigContext);

  const unwatchForm = useMemo(
    () =>
      formStore && formStore.watch
        ? formStore.watch(state => {
            form.setFieldsValue(state);
          })
        : noop,
    //eslint-disable-next-line
    [form]
  );

  useEffect(() => {
    return () => {
      unwatchForm();
    };
  }, [unwatchForm]);

  const handleFormClose = () => {
    onClose && onClose();
  };

  const handleFormSubmit = async () => {
    try {
      form && (await form.validateFields());
      onSubmit && onSubmit();
    } catch (e) {}
  };

  const internalActions = useMemo(() => {
    return actions ? (
      actions
    ) : (
      <>
        <Button onClick={handleFormClose} title={translate("CANCEL_BTN_TITLE")}>
          {translate("CANCEL")}
        </Button>
        <Button onClick={handleFormSubmit} type="primary">
          {translate("SUBMIT")}
        </Button>
      </>
    );
    //eslint-disable-next-line
  }, [actions, translate]);
  return (
    <Drawer
      title={title}
      style={style}
      width={window.innerWidth < width ? window.innerWidth : width}
      onClose={handleFormClose}
      visible={visible}
      actions={internalActions}
      className={className}
    >
      <Form
        layout="vertical"
        colon={false}
        form={form}
        onFinish={handleFormSubmit}
        className="entity-form"
        hideRequiredMark={hideRequiredMark}
      >
        <Loader loading={loading}>{children}</Loader>
      </Form>
    </Drawer>
  );
};

DrawerForm.defaultProps = {
  width: 500
};

export default DrawerForm;
