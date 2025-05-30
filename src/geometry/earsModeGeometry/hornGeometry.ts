import {EarsComponentGeometry} from "../EarsComponentGeometry.ts";

const hornGeometry = new EarsComponentGeometry(8, 8, {
  front: [7 * 8, 0, 8, 8],
  back: [7 * 8, 0, 8, 8]
});

export {hornGeometry}