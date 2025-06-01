import type {LimbMap, LimbSkinPartProps} from "../../types";
import {lLeg, lLegLayer, rLeg, rLegLayer} from "../../geometry/skinPartGeometry/legs.ts";
import {useSkinMaterial} from "../../context/SkinContext.tsx";
import {ClawRenderer} from "../EarsComponents/ClawRenderer.tsx";
import DebugSphere from "../DebugSphere.tsx";

const limbMap: LimbMap = {
  "left": {
    base: lLeg,
    layer: lLegLayer,
    defaultPosition: [-2, 4.5, 0] as const
  },
  "right":  {
    base: rLeg,
    layer: rLegLayer,
    defaultPosition: [2, 4.5, 0] as const
  }
}

export function Leg({ position, hideLayer, side, debug }: LimbSkinPartProps) {
  const skinMaterial = useSkinMaterial();

  return (
    <group name={`${side}Leg`} position={position || limbMap[side].defaultPosition}>
      { debug && <DebugSphere/> }
      <group position={[0,-4.5,0]}>
        <mesh geometry={limbMap[side].base} material={skinMaterial} renderOrder={0}/>
        <mesh geometry={limbMap[side].layer} material={skinMaterial} visible={!hideLayer} renderOrder={1}/>

        <group name={"ears"}>
          <ClawRenderer clawSide={side === "left" ? "lLeg" : "rLeg"}/>
        </group>
      </group>
    </group>
  );
}
