import {getNormVector} from "./getNormVector.ts";
import type {Rect} from "../types";

export function getFaceUV([x, y, w, h]: Rect, textureSize=64) {
  return [
    getNormVector(x, textureSize - y, textureSize),
    getNormVector(x + w, textureSize - y, textureSize),
    getNormVector(x, textureSize - y - h, textureSize),
    getNormVector(x + w, textureSize - y - h, textureSize),
  ]
}
