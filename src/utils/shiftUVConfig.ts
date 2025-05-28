import type {UVConfig} from "../types";

export function getNewShiftUVConfig(config: UVConfig, shiftX=0, shiftY=0) {
  config = structuredClone(config);

  for (const faceName in config) {
    config[faceName as keyof UVConfig][0] += shiftX;
    config[faceName as keyof UVConfig][1] += shiftY;
  }

  return config;
}