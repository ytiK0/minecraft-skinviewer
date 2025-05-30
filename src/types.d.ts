import type { BufferGeometry} from "three";

type Dim = "x" | "y" | "z";

type Rect = [x: number, y: number, width: number, height: number, rotationFlip?: "left" | "right" | "none", mirror?: "x" | "y" | "none"];

interface UVConfig {
  front: Rect
  right: Rect
  back: Rect
  left: Rect
  top: Rect
  bottom: Rect
}

type PlaneUVConfig = Pick<UVConfig, "front" | "back">;

interface SkinPartProps {
  hideLayer?: boolean,
  position?: [number, number, number]
}

interface LimbSkinPartProps extends SkinPartProps {
  side: "left" | "right"
}

interface LimbMap {
  left: {
    base: BufferGeometry,
    layer: BufferGeometry,
    defaultPosition: [number, number, number]
  },
  right: {
    base: BufferGeometry,
    layer: BufferGeometry,
    defaultPosition: [number, number, number]
  }
}