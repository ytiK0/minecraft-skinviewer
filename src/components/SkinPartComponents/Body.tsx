import type {SkinPartProps} from "../../types";
import {body, bodyLayer} from "../../geometry/skinPartGeometry/body.ts";
import {useSkinMaterial} from "../../context/SkinContext.tsx";
import {TailRenderer} from "../EarsComponents/tail/TailRenderer.tsx";

const defaultPosition = [0, 18, 0] as const;

export function Body({ position, hideLayer }: SkinPartProps) {
  const skinMaterial = useSkinMaterial();

  return (
    <group name={"body"} position={position || defaultPosition}>
      <mesh geometry={body} material={skinMaterial} renderOrder={0} />
      <mesh geometry={bodyLayer} material={skinMaterial} visible={!hideLayer} renderOrder={3} />

      <group name={"ears"} renderOrder={1}>
        <TailRenderer />
      </group>
    </group>
  );
}
