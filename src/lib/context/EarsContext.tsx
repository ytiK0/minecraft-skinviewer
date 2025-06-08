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

let hasWarned = false;

export const useEars = <T = EarsContextValue>(
  selector?: (context: EarsContextValue) => T
): T => {
  const context = useContext(EarsContext);

  if (context === undefined) {
    if (!hasWarned) {
      console.warn(
        "[useEars]: EarsContext not found. Falling back to default context. " +
        "Consider wrapping your component tree in <EarsProvider>."
      );
      hasWarned = true;
    }

    const fallback = getDefaultEarsContext();
    return selector ? selector(fallback) : (fallback as unknown as T);
  }

  return selector ? selector(context) : (context as unknown as T);
};
