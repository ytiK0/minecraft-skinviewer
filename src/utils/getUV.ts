import {getFaceUV} from "./getFaceUV.ts";
import type {PlaneUVConfig, UVConfig} from "../types";

const faceOrder = ["front", "right", "back", "left", "top", "bottom"] as const;

export function getUV(uvConfig: UVConfig | PlaneUVConfig, textureSize=64) {
  const uv: number[] = []

  for (const faceName of faceOrder) {
    if (faceName in uvConfig) {
      getFaceUV(uvConfig[faceName as keyof typeof uvConfig], textureSize).forEach(({x, y}) => uv.push(x, y));
    }
  }

  return uv;
}