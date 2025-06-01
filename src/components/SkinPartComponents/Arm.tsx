import type {LimbMap, LimbSkinPartProps} from "../../types";
import {lArm, lArmLayer, rArm, rArmLayer} from "../../geometry/skinPartGeometry/arms.ts";
import {useSkinMaterial} from "../../context/SkinContext.tsx";
import {ClawRenderer} from "../EarsComponents/ClawRenderer.tsx";
import DebugSphere from "../DebugSphere.tsx";

const limbMap: LimbMap = {
  "left": {
    base: lArm,
    layer: lArmLayer,
    defaultPosition: [6, 4.5, 0] as const
  },
  "right":  {
    base: rArm,
    layer: rArmLayer,
    defaultPosition: [-6, 4.5, 0] as const
  }
}

export function Arm({ position, hideLayer, side, debug }: LimbSkinPartProps) {
  const skinMaterial = useSkinMaterial();

  return (
    <object3D name={`${side}Arm`} position={position || limbMap[side].defaultPosition}>
      { debug && <DebugSphere/> }
      <group position={[0,-4.5, 0]} >
        <mesh
          geometry={limbMap[side].base} material={skinMaterial} renderOrder={0}/>
        <mesh
          geometry={limbMap[side].layer} material={skinMaterial} visible={!hideLayer} renderOrder={2}/>
        <group name={"ears"}>
          <ClawRenderer clawSide={side === "left" ? "lArm" : "rArm"} />
        </group>
      </group>
    </object3D>
  );
}
