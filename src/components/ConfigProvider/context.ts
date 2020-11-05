import { createContext } from "react";

export interface ConfigProviderProps {
  translate?: (
    transKey: string,
    interpolationMap?: { [key: string]: any }
  ) => string;
  direction?: "ltr" | "rtl" | undefined;
}

export const defaultContextValue = {
  translate: transKey => transKey
};

const ConfigContext = createContext<ConfigProviderProps>(defaultContextValue);

export default ConfigContext;
