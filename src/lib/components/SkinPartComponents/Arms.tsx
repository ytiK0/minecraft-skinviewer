import type {SkinPartProps} from "../../types";
import {Arm} from "./Arm.tsx";
import DebugSphere from "../DebugSphere.tsx";
import {Vector3} from "three";

const defaultPosition = new Vector3(0, 18, 0);

export function Arms({ position, isSlim, debug}: SkinPartProps & { isSlim?: boolean }) {
  return (
    <group name={"arms"} position={position || defaultPosition}>
      { debug && <DebugSphere color={"#ff0000"} /> }
      <Arm side={"left"}  isSlim={isSlim} debug={debug}/>
      <Arm side={"right"} isSlim={isSlim} debug={debug} />
    </group>
  );
}
