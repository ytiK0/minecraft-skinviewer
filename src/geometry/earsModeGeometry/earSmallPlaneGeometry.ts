import {EarsComponentGeometry} from "../EarsComponentGeometry.ts";

const leftEarSmallPlaneGeometry = new EarsComponentGeometry(8, 4, {
  front: [36, 16, 8, 4],
  back: [12, 16, 8, 4]
});

const rightEarSmallPlaneGeometry = new EarsComponentGeometry(8, 4, {
  front: [36, 32, 8, 4],
  back: [12, 32, 8, 4]
});

export {leftEarSmallPlaneGeometry, rightEarSmallPlaneGeometry};