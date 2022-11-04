import { createContext } from "react";

export interface ConfigProviderProps {
  translate?: (
    transKey: string,
    interpolationMap?: { [key: string]: string | number }
  ) => string;
  direction?: "ltr" | "rtl" | undefined;
}

export const defaultContextValue = {
  translate: (transKey: string) => transKey
};

const ConfigContext = createContext<ConfigProviderProps>(defaultContextValue);

export default ConfigContext;
