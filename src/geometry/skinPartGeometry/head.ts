import {SkinComponentGeometry} from "../SkinComponentGeometry.ts";
import {getNewShiftUVConfig} from "../../utils/shiftUVConfig.ts";
import type {UVConfig} from "../../types";

const headUVConfig: UVConfig = {
  front: [8, 8, 8, 8],
  right: [16, 8, 8, 8],
  back: [24, 8, 8, 8],
  left: [0, 8, 8, 8 ],
  top: [8, 0, 8, 8],
  bottom: [16, 0, 8, 8],
};

const head = new SkinComponentGeometry(8,8, 8, headUVConfig);
const headLayer = new SkinComponentGeometry(8.5, 8.5, 8.5, getNewShiftUVConfig(headUVConfig, 32));

export {head, headLayer}
