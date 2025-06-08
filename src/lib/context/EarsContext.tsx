import { createContext, useContext } from "react";
import type { EarsContextValue } from "../types";

const defaultEarsContextValue= (["ear", "chest", "snout", "tail", "protrusions"] as const)
  .reduce((defValue, partName) => {
    defValue[partName] = {
      mode: "none"
    }
    return defValue
  }, {} as EarsContextValue);

export function getDefaultEarsContext () {
  return structuredClone(defaultEarsContextValue);
}

export const EarsContext = createContext<EarsContextValue>(getDefaultEarsContext());

export const useEars = <T = EarsContextValue>(
  selector?: (context: EarsContextValue) => T
): T => {
  const context = useContext(EarsContext);

  if (context === undefined) {
    throw new Error("useEars must be used within an EarsProvider");
  }

  return selector ? selector(context) : (context as unknown as T);
};
