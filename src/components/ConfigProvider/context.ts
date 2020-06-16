import { createContext } from "react";

export interface ConfigContextValue {
  translate: (transKey: string) => string;
}

const ConfigContext = createContext<ConfigContextValue>({
  translate: transKey => transKey
});

export default ConfigContext;
