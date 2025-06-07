import {SkinComponentGeometry} from "../SkinComponentGeometry.ts";

export function getSnoutFaceGeometry(width: number, heigth: number) {
  return new SkinComponentGeometry(width, heigth, 1, {
    top: [0, 1, width, 1],
    front: [0, 2, width, heigth],
    bottom: [0, heigth + 2, width, 1],
    left: [7, 0, 1, heigth],
    right: [7, 0, 1, heigth],
    back: [0,0,0,0]
  });
}

export function getSnoutBodyGeometry(width: number, height: number, length: number) {
  // the body is shorter by one unit
  return new SkinComponentGeometry(width, height, length - 1, {
    front: [0,0,0,0],
    back:[0,0,0,0],
    right: [7, 4, 1, height],
    left: [7, 4, 1, height],
    top: [0, 0, width, 1],
    bottom: [0, height + 3, width, 1]
  })
}