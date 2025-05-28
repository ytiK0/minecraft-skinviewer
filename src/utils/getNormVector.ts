import {Vector2} from "three";

export function getNormVector(x: number, y: number, normVal=64) {
  return new Vector2(x / normVal, y / normVal)
}