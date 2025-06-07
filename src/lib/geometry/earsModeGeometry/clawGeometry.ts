import {EarsComponentGeometry} from "../EarsComponentGeometry.ts";

const rArmClawGeometry = new EarsComponentGeometry(4,4 , {
  front: [48 + 4, 16, 4, 4],
  back: [48 + 4, 16, 4, 4]
});

const rLegClawGeometry = new EarsComponentGeometry(4,4, {
  front: [0, 16, 4, 4],
  back: [0, 16, 4, 4]
});

const lArmClawGeometry = new EarsComponentGeometry(4,4 , {
  front: [32 + 12, 48, 4, 4],
  back: [32 + 12, 48, 4, 4]
});

const lLegClawGeometry = new EarsComponentGeometry(4,4, {
  front: [16, 48, 4, 4],
  back: [16, 48, 4, 4]
});

export {
  lLegClawGeometry,
  lArmClawGeometry,
  rArmClawGeometry,
  rLegClawGeometry
}