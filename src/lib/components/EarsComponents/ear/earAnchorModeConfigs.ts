import type {AnchorMode} from "../../../types";
import {Vector3} from "three";

export const ANCHOR_POSITION_MAP: Record<AnchorMode, Vector3> = {
  "center": new Vector3(0,0,0),
  "back": new Vector3(0, 0, -4),
  "front": new Vector3(0, 0, 4)
}

interface ElementPose {
  position: Vector3,
  meshPosition: Vector3,
}

export const OUT_MODE_ANCHOR_CONFIG: Record<AnchorMode, ElementPose> = {
  "center": {
    position: new Vector3(4, 4, 0),
    meshPosition: new Vector3(0, 4, 0),
  },
  front: {
    position: new Vector3(4, 0, 4),
    meshPosition: new Vector3(-4, 0, 0),
  },
  back: {
    position: new Vector3(4, 0, -4),
    meshPosition: new Vector3(4, 0, 0),
  },
}