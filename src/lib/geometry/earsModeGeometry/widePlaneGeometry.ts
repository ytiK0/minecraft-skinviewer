import {EarsComponentGeometry} from "../EarsComponentGeometry.ts";

const widePlaneGeometry = new EarsComponentGeometry(16, 8, {
  front: [24, 0, 16, 8],
  back: [56, 28, 8, 16, "right", "x"]
});

export {widePlaneGeometry};