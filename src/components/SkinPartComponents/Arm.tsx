import type {LimbMap, LimbSkinPartProps} from "../../types";
import {lArm, lArmLayer, rArm, rArmLayer} from "../../geometry/skinPartGeometry/arms.ts";

const limbMap: LimbMap = {
  "left": {
    base: lArm,
    layer: lArmLayer,
    defaultPosition: [6, 0, 0] as const
  },
  "right":  {
    base: rArm,
    layer: rArmLayer,
    defaultPosition: [-6, 0, 0] as const
  }
}

export function Arm({ skinMaterial, position, hideLayer, side }: LimbSkinPartProps) {
  return (
    <group name={`${side}Arm`} position={position || limbMap[side].defaultPosition}>
      <mesh geometry={limbMap[side].base} material={skinMaterial} renderOrder={0}/>
      <mesh geometry={limbMap[side].layer} material={skinMaterial} visible={!hideLayer} renderOrder={1}/>
    </group>
  );
}
