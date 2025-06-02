import type {LimbMap, LimbSkinPartProps} from "../../types";
import {lArm, lArmLayer, rArm, rArmLayer} from "../../geometry/skinPartGeometry/arms.ts";
import {useSkinMaterial} from "../../context/SkinContext.tsx";
import {ClawRenderer} from "../EarsComponents/ClawRenderer.tsx";
import DebugSphere from "../DebugSphere.tsx";
import {Vector3} from "three";
import {lSlimArm, lSlimArmLayer, rSlimArm, rSlimArmLayer} from "../../geometry/skinPartGeometry/slimArms.ts";

const armMap: LimbMap = {
  left: {
    base: lArm,
    layer: lArmLayer,
    defaultPosition: new Vector3(6, 4.5, 0)
  },
  right:  {
    base: rArm,
    layer: rArmLayer,
    defaultPosition: new Vector3(-6, 4.5, 0)
  }
}

const slimArmMap: LimbMap = {
  left: {
    base: lSlimArm,
    layer: lSlimArmLayer,
    defaultPosition: new Vector3(6, 4.5, 0)
  },
  right: {
    base: rSlimArm,
    layer: rSlimArmLayer,
    defaultPosition: new Vector3(-6, 4.5, 0)
  }
}

export function Arm({ position, hideLayer, side, debug, isSlim }: LimbSkinPartProps & { isSlim?: boolean }) {
  const skinMaterial = useSkinMaterial();

  const currentMap = isSlim ? slimArmMap : armMap;

  return (
    <object3D name={`${side}Arm`} position={position || currentMap[side].defaultPosition}>
      { debug && <DebugSphere/> }
      <group position={[0,-4.5, 0]} >
        <mesh geometry={currentMap[side].base} material={skinMaterial} renderOrder={0}/>
        <mesh geometry={currentMap[side].layer} material={skinMaterial} visible={!hideLayer} renderOrder={2}/>
        <group name={"ears"}>
          <ClawRenderer clawSide={side === "left" ? "lArm" : "rArm"} />
        </group>
      </group>
    </object3D>
  );
}
