import {Leg} from "./Leg";
import type {SkinPartProps} from "../../types";
import DebugSphere from "../DebugSphere.tsx";
import {Euler} from "three";

const defaultPosition = [0, 6, 0] as const;
const defaultRotation = new Euler(0,0,0);

export  function Legs({ position, debug, rotation }: SkinPartProps) {
  return (
    <group name={"legs"} position={position || defaultPosition} rotation={rotation || defaultRotation}>
      { debug && <DebugSphere color={"#ff0000"} /> }
      <Leg side={"left"} debug={debug} />
      <Leg side={"right"} debug={debug} />
    </group>
  );
}
