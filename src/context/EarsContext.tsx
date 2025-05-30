import { createContext, useContext } from "react";
import type { EarsContextValue } from "../types";
import {defaultEarsContextValue} from "../utils/decodeEarsSkin.ts";

export const EarsContext = createContext<EarsContextValue>(defaultEarsContextValue);

export const useEars = <T = EarsContextValue>(
  selector?: (context: EarsContextValue) => T
): T => {
  const context = useContext(EarsContext);

  if (context === undefined) {
    throw new Error("useEars must be used within an EarsProvider");
  }

  return selector ? selector(context) : (context as unknown as T);
};
