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
  formStore?: any;
  form?: any;
  loading?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
}

const noop = () => {};

const DrawerForm: React.FC<DrawerFormProps> = ({
  actions,
  title,
  visible,
  children,
  form,
  formStore,
  loading,
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
        <Button onClick={handleFormClose}>{translate("CANCEL")}</Button>
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
      width={window.innerWidth < 500 ? window.innerWidth : 500}
      onClose={handleFormClose}
      visible={visible}
      actions={internalActions}
    >
      <Form
        layout="vertical"
        colon={false}
        form={form}
        onFinish={handleFormSubmit}
      >
        <Loader loading={loading}>{children}</Loader>
      </Form>
    </Drawer>
  );
};

export default DrawerForm;
