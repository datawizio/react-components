import React, { useMemo, useContext, useEffect, useCallback } from "react";
import clsx from "clsx";
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
  layout?: "horizontal" | "vertical";
  hideRequiredMark?: boolean;
  formStore?: any;
  loading?: boolean;
  style?: object;
  width?: number;
  convertState?: (state: any) => any;
  onClose?: () => void;
  onSubmit?: () => void;
  validateTrigger?: string | string[];
  showSelectedItemsCounter?: boolean;
  maxItemsCount?: number;
  selectedItemsCount?: number;
}

const noop = () => {};

const DrawerForm: React.FC<DrawerFormProps> = ({
  actions,
  className,
  layout,
  title,
  style,
  visible,
  hideRequiredMark,
  children,
  form,
  formStore,
  loading,
  width,
  showSelectedItemsCounter,
  maxItemsCount,
  selectedItemsCount,
  convertState,
  onClose,
  onSubmit,
  validateTrigger
}) => {
  const { translate } = useContext(ConfigContext);

  const unwatchForm = useMemo(
    () =>
      formStore && formStore.watch
        ? formStore.watch(state => {
            if (convertState) {
              state = convertState(state);
            }
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

  const handleFormSubmit = useCallback(async () => {
    try {
      form && (await form.validateFields());
      onSubmit && onSubmit();
    } catch (e) {}
  }, [form, onSubmit]);

  const internalActions = useMemo(() => {
    return actions ? (
      actions
    ) : (
      <>
        <Button onClick={handleFormClose} title={translate("CANCEL_BTN_TITLE")}>
          {translate("CANCEL")}
        </Button>
        <Button
          onClick={handleFormSubmit}
          type="primary"
          disabled={
            showSelectedItemsCounter && selectedItemsCount > maxItemsCount
          }
        >
          {translate("SUBMIT")}
        </Button>
      </>
    );
    //eslint-disable-next-line
  }, [
    handleFormSubmit,
    actions,
    translate,
    showSelectedItemsCounter,
    selectedItemsCount,
    maxItemsCount
  ]);

  const selectedItemsCounter = useMemo(() => {
    return showSelectedItemsCounter ? (
      <div
        className={clsx("drawer-tree-select-selected", {
          "drawer-form-validation-error": selectedItemsCount > maxItemsCount
        })}
      >
        <div className="drawer-tree-select-selected-title">
          {translate("SELECTED")}
        </div>
        <div className="drawer-tree-select-selected-count">
          {selectedItemsCount} / {maxItemsCount}
        </div>
      </div>
    ) : null;
  }, [maxItemsCount, selectedItemsCount, showSelectedItemsCounter, translate]);

  return (
    <Drawer
      title={title}
      style={style}
      width={window.innerWidth < width ? window.innerWidth : width}
      onClose={handleFormClose}
      visible={visible}
      actions={internalActions}
      className={clsx("drawer-form", className)}
    >
      <Form
        layout={layout ?? "vertical"}
        colon={false}
        form={form}
        onFinish={handleFormSubmit}
        className="entity-form"
        hideRequiredMark={hideRequiredMark}
        validateTrigger={validateTrigger}
      >
        <Loader loading={loading}>{children}</Loader>
      </Form>
      {selectedItemsCounter}
    </Drawer>
  );
};

DrawerForm.defaultProps = {
  width: 500,
  maxItemsCount: 50,
  selectedItemsCount: 0
};

export default DrawerForm;
