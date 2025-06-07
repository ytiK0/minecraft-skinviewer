import {BufferGeometry, Float32BufferAttribute} from "three";
import {Vector3} from "three";
import {getUV} from "../utils/getUV.ts";
import type {Dim, UVConfig} from "../types";

function getDirsByExcludeAxe(axe: "x" | "y" | "z") {
  if (axe === "x") {
    return {
      dirs: [[1,1],[1,-1],[-1,1],[-1,-1]],
      axis: ["y", "z"] as const
    } ;
  }
  else if (axe === "y") {
    return {
      dirs: [[-1,-1],[1,-1],[-1,1],[1,1]],
      axis: ["x", "z"] as const
    };
  }
  else {
    return {
      dirs: [[-1,1],[1,1],[-1,-1],[1,-1]],
      axis: ["x", "y"] as const
    };
  }
}

export class SkinComponentGeometry extends BufferGeometry {
  public readonly width: number;
  public readonly height: number;
  public readonly depth: number;

  constructor(width: number, height: number, depth: number, UVConfig: UVConfig) {
    super();

    this.height = height;
    this.width = width;
    this.depth = depth;

    const widthHalf = width / 2;
    const heightHalf = height / 2;
    const depthHalf = depth / 2;

    const vertices: number[] = [];
    const indexes: number[] = [];

    const axeMap: Record<Dim, number> = {
      "x": widthHalf,
      "y": heightHalf,
      "z": depthHalf,
    }

    let vertCnt = 0;

    const faces = [["z", 1], ["x", 1], ["z", -1], ["x", -1], ["y", 1], ["y", -1]] as const;

    faces.forEach(([axe, dir]) => buildFace(axe, dir));

    function buildFace (axe: Dim, dir: 1 | -1) {
      let indexBase = vertCnt;

      const baseVector = new Vector3();
      baseVector[axe] = axeMap[axe] * dir;

      const {dirs, axis} = getDirsByExcludeAxe(axe);

      if (dir === -1 && axe !== "y") {
          [dirs[0], dirs[1]] = [dirs[1], dirs[0]];
          [dirs[2], dirs[3]] = [dirs[3], dirs[2]];
      }

      for (const [dx, dy] of dirs) {
        baseVector[axis[0]] = axeMap[axis[0]] * dx;
        baseVector[axis[1]] = axeMap[axis[1]] * dy;

        vertices.push(baseVector.x, baseVector.y, baseVector.z);
        vertCnt++;
      }

      if (axe === "y" && dir === -1) {
        indexes.push(indexBase + 1, indexBase + 2, indexBase);
        indexes.push(indexBase + 2, indexBase + 1, indexBase + 3);
      } else {
        indexes.push(indexBase, indexBase + 2, indexBase + 1);
        indexes.push(indexBase + 3, indexBase + 1, indexBase + 2);
      }
    }

    const uvs: number[] = getUV(UVConfig);

    this.setIndex(indexes)
    this.setAttribute("position", new Float32BufferAttribute(vertices, 3));
    this.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
  }
}