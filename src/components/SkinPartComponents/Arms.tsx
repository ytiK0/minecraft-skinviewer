import type {SkinPartProps} from "../../types";
import {Arm} from "./Arm.tsx";

const defaultPosition = [0, 18, 0] as const;

export function Arms({ position, hideLayer}: SkinPartProps & {isSlim?: boolean}) {
  return (
    <group name={"arms"} position={position || defaultPosition}>
      <Arm side={"left"} hideLayer={hideLayer} />
      <Arm side={"right"} hideLayer={hideLayer} />
    </group>
  );
}
