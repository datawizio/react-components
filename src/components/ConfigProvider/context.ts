import { createContext } from "react";

export interface ConfigProviderProps {
  translate?: (
    transKey: string,
    interpolationMap?: { [key: string]: any }
  ) => string;
}

export const defaultContextValue = {
  translate: transKey => transKey
};

const ConfigContext = createContext<ConfigProviderProps>(defaultContextValue);

export default ConfigContext;
