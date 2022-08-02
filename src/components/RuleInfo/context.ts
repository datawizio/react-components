import { createContext } from "react";
import { IRuleInfoContext } from "./types";

export const RuleInfoContext = createContext<IRuleInfoContext>(null);

RuleInfoContext.displayName = "RuleInfoContext";
