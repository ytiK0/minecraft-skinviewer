import type {SkinPartProps} from "../../types";
import {head, headLayer} from "../../geometry/skinPartGeometry/head.ts";

const defaultPosition = [0, 28, 0] as const;

export function Head({ skinMaterial, position, hideLayer }: SkinPartProps) {
  return (
    <group name={"head"} position={position || defaultPosition}>
      <mesh geometry={head} material={skinMaterial} renderOrder={0} />
      <mesh geometry={headLayer} material={skinMaterial} visible={!hideLayer} renderOrder={1} />
    </group>
  );
}
