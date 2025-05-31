import { type Euler, Vector3 } from "three";
import type {PropsWithChildren} from "react";

interface TailRootProps {
  rotation: Euler,
  position?: Vector3
}

const DEFAULT_TAIL_ROOT_POSITION = new Vector3(0, -4, -2);

export function TailRoot({rotation, position, children}: PropsWithChildren<TailRootProps>) {
  position ||= DEFAULT_TAIL_ROOT_POSITION

  return (
    <object3D position={position} rotation={rotation} renderOrder={1}>
      { children }
    </object3D>
  );
}