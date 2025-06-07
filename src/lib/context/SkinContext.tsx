import {createContext, useContext} from "react";
import {type Material} from "three";

export const SkinMaterialContext = createContext<Material|null>(null);

export const useSkinMaterial = () => {
  const context = useContext(SkinMaterialContext);

  if (context === null) {
    throw new Error("useSkin must be used within an SkinMaterialProvider")
  }

  return context;
};
