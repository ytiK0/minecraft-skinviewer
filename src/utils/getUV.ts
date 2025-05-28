import {getFaceUV} from "./getFaceUV.ts";
import type {UVConfig} from "../types";

const faceOrder: (keyof UVConfig)[] = ["front", "right", "back", "left", "top", "bottom"];

export function getUV(UVConfig: UVConfig, textureSize=64) {
  const uv: number[] = []

  for (const faceName of faceOrder) {
    getFaceUV(UVConfig[faceName], textureSize).forEach(({x, y}) => uv.push(x, y));
  }

  return uv;
}