import {BufferGeometry, Float32BufferAttribute} from "three";
import type {PlaneUVConfig} from "../types";
import {getUV} from "../utils/getUV.ts";

export class EarsComponentGeometry extends BufferGeometry {
  protected width: number;
  protected height: number;
  constructor(width: number, height: number, uvConfig: PlaneUVConfig) {
    super();

    this.width = width;
    this.height = height

    const widthHalf = width / 2;
    const heightHalf = height / 2;

    const vertices: number[] = [
      -widthHalf, 0, -heightHalf,
      widthHalf, 0, -heightHalf,
      -widthHalf, 0, heightHalf,
      widthHalf, 0, heightHalf,

      -widthHalf, 0, -heightHalf,
      widthHalf, 0, -heightHalf,
      -widthHalf, 0, heightHalf,
      widthHalf, 0, heightHalf,
    ];
    const indexes: number[] = [
      0, 2, 1,
      3, 1, 2,
      6, 4, 7,
      4, 5, 7,
    ];

    const uvs: number[] = getUV(uvConfig);

    this.setIndex(indexes);
    this.setAttribute("position", new Float32BufferAttribute(vertices, 3));
    this.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
  }

}