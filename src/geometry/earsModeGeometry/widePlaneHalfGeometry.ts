import {EarsComponentGeometry} from "../EarsComponentGeometry.ts";

const leftWidePlaneHalf = new EarsComponentGeometry(8, 8, {
  front: [24, 0, 8, 8],
  back: [56, 28, 8, 8, "right", "x"]
});

const rightWidePlaneHalf = new EarsComponentGeometry(8, 8, {
  front: [32, 0, 8, 8],
  back: [56, 28+8, 8, 8, "right", "x"]
});


export {leftWidePlaneHalf, rightWidePlaneHalf}