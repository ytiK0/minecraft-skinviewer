import {Leg} from "./Leg";
import type {SkinPartProps} from "../../types";

const defaultPosition = [0, 6, 0] as const;

export  function Legs({ skinMaterial, position, hideLayer}: SkinPartProps) {
  return (
    <group name={"legs"} position={position || defaultPosition}>
      <Leg side={"left"} skinMaterial={skinMaterial} hideLayer={hideLayer} />
      <Leg side={"right"} skinMaterial={skinMaterial} hideLayer={hideLayer} />
    </group>
  );
}
