import type {SkinPartProps} from "../../types";
import {body, bodyLayer} from "../../geometry/skinPartGeometry/body.ts";

const defaultPosition = [0, 18, 0] as const;

export function Body({ skinMaterial, position, hideLayer }: SkinPartProps) {
  return (
    <group name={"body"} position={position || defaultPosition}>
      <mesh geometry={body} material={skinMaterial} renderOrder={0} />
      <mesh geometry={bodyLayer} material={skinMaterial} visible={!hideLayer} renderOrder={1} />
    </group>
  );
}
