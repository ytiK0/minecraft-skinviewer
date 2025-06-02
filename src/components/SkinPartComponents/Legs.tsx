import {Leg} from "./Leg";
import type {SkinPartProps} from "../../types";
import DebugSphere from "../DebugSphere.tsx";

const defaultPosition = [0, 6, 0] as const;

export  function Legs({ position, hideLayer, debug}: SkinPartProps) {
  return (
    <group name={"legs"} position={position || defaultPosition}>
      { debug && <DebugSphere color={"#ff0000"} /> }
      <Leg side={"left"} hideLayer={hideLayer} debug={debug} />
      <Leg side={"right"} hideLayer={hideLayer} debug={debug} />
    </group>
  );
}
