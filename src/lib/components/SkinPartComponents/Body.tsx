import type {SkinPartProps} from "../../types";
import {body, bodyLayer} from "../../geometry/skinPartGeometry/body.ts";
import {useSkinMaterial} from "../../context/SkinContext.tsx";
import {TailRenderer} from "../EarsComponents/tail/TailRenderer.tsx";
import DebugSphere from "../DebugSphere.tsx";
import {Euler, Vector3} from "three";
import {useLayers} from "../../context/LayersContext.tsx";

const defaultPosition = new Vector3(0, 18, 0);
const defaultRotation = new Euler(0,0,0);

export function Body({ position, debug, rotation  }: SkinPartProps) {
  const skinMaterial = useSkinMaterial();

  const {
    isBaseVisible,
    isOverlayVisible
  } = useLayers(ctx => ctx.body);

  return (
    <group name={"body"} position={position || defaultPosition} rotation={rotation || defaultRotation}>
      { debug && <DebugSphere /> }
      <mesh geometry={body} material={skinMaterial} visible={isBaseVisible} renderOrder={0} />
      <mesh geometry={bodyLayer} material={skinMaterial} visible={isOverlayVisible} renderOrder={3} />

      <group name={"ears"} renderOrder={1}>
        <TailRenderer debug={debug}/>
      </group>
    </group>
  );
}
