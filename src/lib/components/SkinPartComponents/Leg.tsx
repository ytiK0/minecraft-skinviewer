import type {LimbMap, LimbSkinPartProps} from "../../types";
import {lLeg, lLegLayer, rLeg, rLegLayer} from "../../geometry/skinPartGeometry/legs.ts";
import {useSkinMaterial} from "../../context/SkinContext.tsx";
import {ClawRenderer} from "../EarsComponents/ClawRenderer.tsx";
import DebugSphere from "../DebugSphere.tsx";
import {Euler, Vector3} from "three";
import {useLayers} from "../../context/LayersContext.tsx";

const limbMap: LimbMap = {
  "left": {
    base: lLeg,
    layer: lLegLayer,
    defaultPosition: new Vector3(-2, 4.5, 0)
  },
  "right":  {
    base: rLeg,
    layer: rLegLayer,
    defaultPosition: new Vector3(2, 4.5, 0)
  }
}
const defaultRotation = new Euler(0,0,0);

export function Leg({ position, rotation, side, debug }: LimbSkinPartProps) {
  const legName = side === "left" ? "lLeg" : "rLeg";
  const skinMaterial = useSkinMaterial();

  const {
    isBaseVisible,
    isOverlayVisible
  } = useLayers(ctx => ctx[legName])

  return (
    <group name={`${side}Leg`} position={position || limbMap[side].defaultPosition} rotation={rotation || defaultRotation}>
      { debug && <DebugSphere /> }
      <group position={[0,-4.5,0]}>
        <mesh geometry={limbMap[side].base} material={skinMaterial} visible={isBaseVisible} renderOrder={0}/>
        <mesh geometry={limbMap[side].layer} material={skinMaterial} visible={isOverlayVisible} renderOrder={2}/>

        <group name={"ears"}>
          <ClawRenderer clawSide={legName} debug={debug}/>
        </group>
      </group>
    </group>
  );
}
