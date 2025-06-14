import {SkinComponentGeometry} from "../SkinComponentGeometry.ts";
import {getNewShiftUVConfig} from "../../utils/shiftUVConfig.ts";
import type {UVConfig} from "../../types";

const bodyUVConfig: UVConfig = {
  front: [20, 20, 8, 12],
  right: [28, 20, 4, 12],
  back: [32, 20, 8, 12],
  left: [16, 20, 4, 12],
  top: [20, 16, 8, 4],
  bottom: [28, 16, 8, 4],
}

const zFighter = 0.001;

const body = new SkinComponentGeometry(8, 12, 4, bodyUVConfig);
const bodyLayer = new SkinComponentGeometry(8.5 + zFighter, 12.5 + zFighter, 4.5 + zFighter, getNewShiftUVConfig(bodyUVConfig, 0, 16));

export {body, bodyLayer}