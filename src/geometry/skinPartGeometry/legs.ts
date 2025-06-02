import {SkinComponentGeometry} from "../SkinComponentGeometry.ts";
import {getNewShiftUVConfig} from "../../utils/shiftUVConfig.ts";
import type {UVConfig} from "../../types";

const rLegUVConfig: UVConfig = {
  left: [16, 52, 4, 12],
  front: [20, 52, 4, 12],
  right: [24, 52, 4, 12],
  back: [28, 52, 4, 12],
  top: [20, 48, 4, 4],
  bottom: [24, 48, 4, 4],
}

const lLegUVConfig: UVConfig = {
  left: [0, 20, 4, 12],
  front: [4, 20, 4, 12],
  right: [8, 20, 4, 12],
  back: [12, 20, 4, 12],
  top: [4, 16, 4, 4],
  bottom: [8, 16, 4, 4],
}

const zFighter = -0.001;

const lLeg = new SkinComponentGeometry(4, 12, 4, lLegUVConfig);
const rLeg = new SkinComponentGeometry(4, 12, 4, rLegUVConfig);

const lLegLayer = new SkinComponentGeometry(4.5, 12.5, 4.5, getNewShiftUVConfig(lLegUVConfig, 0, 16));
const rLegLayer = new SkinComponentGeometry(4.5 + zFighter, 12.5 + zFighter, 4.5 + zFighter, getNewShiftUVConfig(rLegUVConfig, -16));

export {lLeg, rLeg, lLegLayer, rLegLayer}