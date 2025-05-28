import {SkinComponentGeometry} from "../SkinComponentGeometry.ts";
import {getNewShiftUVConfig} from "../../utils/shiftUVConfig.ts";
import type {UVConfig} from "../../types";

const lLegUVConfig: UVConfig = {
  left: [16, 52, 4, 12],
  front: [20, 52, 4, 12],
  right: [24, 52, 4, 12],
  back: [28, 52, 4, 12],
  top: [20, 48, 4, 4],
  bottom: [24, 48, 4, 4],
}

const rLegUVConfig: UVConfig = {
  left: [0, 20, 4, 12],
  front: [4, 20, 4, 12],
  right: [8, 20, 4, 12],
  back: [12, 20, 4, 12],
  top: [4, 16, 4, 4],
  bottom: [8, 16, 4, 4],
}

const lLeg = new SkinComponentGeometry(4, 12, 4, lLegUVConfig);
const rLeg = new SkinComponentGeometry(4, 12, 4, rLegUVConfig);

const lLegLayer = new SkinComponentGeometry(5, 13, 5, getNewShiftUVConfig(lLegUVConfig, -16));
const rLegLayer = new SkinComponentGeometry(5.01, 13.01, 5.01, getNewShiftUVConfig(rLegUVConfig, 0, 16));

export {lLeg, rLeg, lLegLayer, rLegLayer}