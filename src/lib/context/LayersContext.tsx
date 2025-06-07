import {createContext, useContext} from "react";

interface SkinPartLayerConfig {
  isBaseVisible: boolean,
  isOverlayVisible: boolean
}

type SkinPartName = "head" | "body" | "lArm" | "rArm" | "lLeg" | "rLeg";

export type LayersContextValue = Record<SkinPartName, SkinPartLayerConfig>;

const skinPartNames: SkinPartName[] = ["head", "body", "lArm", "rArm", "lLeg", "rLeg"];

export const defaultLayersConfig = skinPartNames.reduce((defValue, partName) => {
  defValue[partName] = {
    isOverlayVisible: true,
    isBaseVisible: true
  };
  return defValue;
}, {} as LayersContextValue);

export const LayersContext = createContext<LayersContextValue>(defaultLayersConfig);

export const useLayers = <T = LayersContextValue>(
  selector?: (context: LayersContextValue) => T
): T => {
  const context = useContext(LayersContext);

  return selector ? selector(context) : (context as unknown as T);
};
