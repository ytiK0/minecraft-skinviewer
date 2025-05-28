import {SkinComponentGeometry} from "../SkinComponentGeometry.ts";
import {getNewShiftUVConfig} from "../../utils/shiftUVConfig.ts";
import type {UVConfig} from "../../types";

const lHandUVConfig: UVConfig = {
  front: [36, 52, 4, 12],
  right: [40, 52, 4, 12],
  back: [44, 52, 4, 12],
  left: [32, 52, 4, 12],
  bottom: [40, 48, 4, 4],
  top: [36, 48, 4, 4]
}

const rHandUVConfig: UVConfig = {
  front: [44, 20, 4, 12],
  right: [48, 20, 4, 12],
  back: [52, 20, 4, 12],
  left: [40, 20, 4, 12],
  top: [44, 16, 4, 4],
  bottom: [48, 16, 4, 4],
}

const lArm = new SkinComponentGeometry(4, 12, 4, lHandUVConfig);
const rArm = new SkinComponentGeometry(4, 12, 4, rHandUVConfig);

const lArmLayer = new SkinComponentGeometry(5, 13, 5, getNewShiftUVConfig(lHandUVConfig, 16));
const rArmLayer = new SkinComponentGeometry(5, 13, 5, getNewShiftUVConfig(rHandUVConfig, 0, 16));


export {lArm, rArm, lArmLayer, rArmLayer};