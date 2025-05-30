import { getNormVector } from "./getNormVector.ts";
import type { Rect } from "../types";
import type {Vector2} from "three";

export function getFaceUV(
  [x, y, w, h, flip = "none", mirror = "none"]: Rect,
  textureSize = 64
): Vector2[] {
  const top = textureSize - y;
  const bottom = textureSize - y - h;
  const left = x;
  const right = x + w;

  let matrix = [
    [getNormVector(left, top, textureSize), getNormVector(right, top, textureSize)],
    [getNormVector(left, bottom, textureSize), getNormVector(right, bottom, textureSize)],
  ];

  if (mirror === "x") {
    matrix = matrix.map(row => [row[1], row[0]]);
  } else if (mirror === "y") {
    matrix = [matrix[1], matrix[0]];
  }

  const [[a, b], [c, d]] = matrix;

  if (flip === "right") {
    matrix = [
      [c, a],
      [d, b],
    ];
  }
  else if (flip === "left") {
    matrix = [
      [b, d],
      [a, c]
    ];
  }

  return matrix.flat();
}
