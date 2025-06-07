import {SkinComponentGeometry} from "../SkinComponentGeometry.ts";
import {getNewShiftUVConfig} from "../../utils/shiftUVConfig.ts";
import type {UVConfig} from "../../types";

const lArmUVConfig: UVConfig = {
  front: [36, 52, 3, 12],
  right: [39, 52, 4, 12],
  back: [43, 52, 3, 12],
  left: [32, 52, 4, 12],
  bottom: [39, 48, 3, 4],
  top: [36, 48, 3, 4]
}

const rArmUVConfig: UVConfig = {
  front: [44, 20, 3, 12],
  right: [47, 20, 4, 12],
  back: [51, 20, 3, 12],
  left: [40, 20, 4, 12],
  top: [44, 16, 3, 4],
  bottom: [47, 16, 3, 4],
}

const lSlimArm = new SkinComponentGeometry(4, 12, 4, lArmUVConfig);
const rSlimArm = new SkinComponentGeometry(4, 12, 4, rArmUVConfig);

const lSlimArmLayer = new SkinComponentGeometry(4.5, 12.5, 4.5, getNewShiftUVConfig(lArmUVConfig, 16));
const rSlimArmLayer = new SkinComponentGeometry(4.5, 12.5, 4.5, getNewShiftUVConfig(rArmUVConfig, 0, 16));


export {lSlimArm, rSlimArm, lSlimArmLayer, rSlimArmLayer};