import React, { useMemo } from "react";

import AntdConfigProvider, {
  ConfigProviderProps as AntdConfigProviderProps
} from "antd/es/config-provider";

import ConfigContext, {
  ConfigProviderProps,
  defaultContextValue
} from "./context";

const ConfigProvider: React.FC<
  ConfigProviderProps & AntdConfigProviderProps
> = props => {
  const { children, translate, direction, ...restProps } = props;

  const contextValue = useMemo<ConfigProviderProps>(() => {
    const nextValue: ConfigProviderProps = {};

    if (translate) nextValue.translate = translate;
    if (direction) nextValue.direction = direction;

    return nextValue;
  }, [direction, translate]);

  return (
    <ConfigContext.Provider value={contextValue}>
      <AntdConfigProvider {...restProps}>{children}</AntdConfigProvider>
    </ConfigContext.Provider>
  );
};

ConfigProvider.defaultProps = defaultContextValue;

export default ConfigProvider;
