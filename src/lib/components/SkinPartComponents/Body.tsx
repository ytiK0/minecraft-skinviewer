import type {SkinPartProps} from "../../types";
import {body, bodyLayer} from "../../geometry/skinPartGeometry/body.ts";
import {useSkinMaterial} from "../../context/SkinContext.tsx";
import {TailRenderer} from "../EarsComponents/tail/TailRenderer.tsx";
import DebugSphere from "../DebugSphere.tsx";
import {Vector3} from "three";

const defaultPosition = new Vector3(0, 18, 0);

export function Body({ position, hideLayer, debug }: SkinPartProps) {
  const skinMaterial = useSkinMaterial();

  return (
    <group name={"body"} position={position || defaultPosition}>
      { debug && <DebugSphere /> }
      <mesh geometry={body} material={skinMaterial} renderOrder={0} />
      <mesh geometry={bodyLayer} material={skinMaterial} visible={!hideLayer} renderOrder={3} />

      <group name={"ears"} renderOrder={1}>
        <TailRenderer debug={debug}/>
      </group>
    </group>
  );
}
