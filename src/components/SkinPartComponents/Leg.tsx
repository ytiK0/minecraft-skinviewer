import type {LimbMap, LimbSkinPartProps} from "../../types";
import {lLeg, lLegLayer, rLeg, rLegLayer} from "../../geometry/skinPartGeometry/legs.ts";

const limbMap: LimbMap = {
  "left": {
    base: lLeg,
    layer: lLegLayer,
    defaultPosition: [-2, 0, 0] as const
  },
  "right":  {
    base: rLeg,
    layer: rLegLayer,
    defaultPosition: [2, 0, 0] as const
  }
}

export function Leg({ skinMaterial, position, hideLayer, side }: LimbSkinPartProps) {
  return (
    <group name={`${side}Leg`} position={position || limbMap[side].defaultPosition}>
      <mesh geometry={limbMap[side].base} material={skinMaterial} renderOrder={0} />
      <mesh geometry={limbMap[side].layer} material={skinMaterial} visible={!hideLayer} renderOrder={1} />
    </group>
  );
}
