import type {SkinPartProps} from "../../types";
import {head, headLayer} from "../../geometry/skinPartGeometry/head.ts";
import {Euler, Vector3} from "three";
import {useSkinMaterial} from "../../context/SkinContext.tsx";
import {useLayers} from "../../context/LayersContext.tsx";
import {EarRenderer} from "../EarsComponents/ear/EarRenderer.tsx";
import {HornRenderer} from "../EarsComponents/HornRenderer.tsx";
import {SnoutRender} from "../EarsComponents/snout/SnoutRender.tsx";
import DebugSphere from "../DebugSphere.tsx";

const defaultPosition = new Vector3(0,28 ,0);
const defaultRotation = new Euler(0,0,0);

export function Head({ position, debug, rotation }: SkinPartProps) {
  const skinMaterial = useSkinMaterial();
  const {
    isBaseVisible,
    isOverlayVisible
  } = useLayers((conf) => conf.head);


  return (
    <group name={"head"} position={position || defaultPosition} rotation={rotation || defaultRotation} >
      { debug && <DebugSphere /> }
      <mesh geometry={head} material={skinMaterial} renderOrder={0} visible={isBaseVisible}/>
      <mesh geometry={headLayer} material={skinMaterial} renderOrder={2}  visible={isOverlayVisible} />
      <group name={"ears"} >
        <EarRenderer debug={debug} />
        <SnoutRender debug={debug} />
        <HornRenderer debug={debug}/>
      </group>
    </group>
  );
}
