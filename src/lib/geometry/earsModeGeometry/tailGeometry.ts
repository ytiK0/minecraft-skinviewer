import {EarsComponentGeometry} from "../EarsComponentGeometry.ts";

const tailGeometry = [
  new EarsComponentGeometry(12, 8, {
    front: [64 - 8, 16, 8, 12, "left"],
    back: [64 - 8, 16, 8, 12, "left"]
  })
];

const tail2BendGeometry = [
  new EarsComponentGeometry(6, 8, {
    front: [64 - 8, 16, 8, 6, "left"],
    back: [64 - 8, 16, 8, 6, "left"]
  }),
  new EarsComponentGeometry(6, 8, {
    front: [64 - 8, 22, 8, 6, "left"],
    back: [64 - 8, 22, 8, 6, "left"]
  })
];

const tail3BendGeometry = [
  new EarsComponentGeometry(4, 8, {
    front: [64 - 8, 16, 8, 4, "left"],
    back: [64 - 8, 16, 8, 4, "left"]
  }),
  new EarsComponentGeometry(4, 8, {
    front: [64 - 8, 20, 8, 4, "left"],
    back: [64 - 8, 20, 8, 4, "left"]
  }),
  new EarsComponentGeometry(4, 8, {
    front: [64 - 8, 24, 8, 4, "left"],
    back: [64 - 8, 24, 8, 4, "left"]
  }),
]

const tail4BendGeometry = [
  new EarsComponentGeometry(3, 8, {
    front: [64 - 8, 16, 8, 3, "left"],
    back: [64 - 8, 16, 8, 3, "left"]
  }),
  new EarsComponentGeometry(3, 8, {
    front: [64 - 8, 19, 8, 3, "left"],
    back: [64 - 8, 19, 8, 3, "left"]
  }),
  new EarsComponentGeometry(3, 8, {
    front: [64 - 8, 22, 8, 3, "left"],
    back: [64 - 8, 22, 8, 3, "left"]
  }),
  new EarsComponentGeometry(3,8, {
    front: [64 - 8, 25, 8, 3, "left"],
    back: [64 - 8, 25, 8, 3, "left"]
  })
]

export { tailGeometry, tail2BendGeometry, tail3BendGeometry, tail4BendGeometry };