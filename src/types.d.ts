import {type BufferGeometry, Material} from "three";

type Dim = "x" | "y" | "z";

type Rect = [number, number, number, number];

interface UVConfig {
  front: Rect
  right: Rect
  back: Rect
  left: Rect
  top: Rect
  bottom: Rect
}

interface SkinPartProps {
  skinMaterial: Material,
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