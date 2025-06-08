import type {BufferGeometry, Euler, EulerTuple, Vector3, Vector3Tuple} from "three";

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
  position?: Vector3 | Vector3Tuple,
  rotation?: Euler | EulerTuple
  debug?: boolean
}

interface LimbSkinPartProps extends SkinPartProps {
  side: "left" | "right"
}

interface LimbMap {
  left: {
    base: BufferGeometry,
    layer: BufferGeometry,
    defaultPosition: Vector3
  },
  right: {
    base: BufferGeometry,
    layer: BufferGeometry,
    defaultPosition: Vector3
  }
}

type MagicPixelsColor = "green" | "cyan" | "blue" | "gray" | "purple" | "red" | "pink" | "purple2" | "orange" | "white";


type TailMode = "none" | "down" | "back" | "up" | "vertical" | "cross" | "oCross" | "star" | "oStar";
type EarMode = "none" | "above" | "sides" | "out" | "around" | "floppy" | "cross" | "tall" | "tallCross";
type ProtrusionMode = "none" | "claws" | "horn" | "both";

type AnchorMode = "center" | "front" | "back";



type EarsContextValue = {
  ear: {
    mode: "none",
  } | {
    mode: Exclude<EarMode, "none">,
    anchor: AnchorMode
  },

  protrusions: {
    mode: ProtrusionMode
  },

  tail: {
    mode: "none"
  } | {
    mode: Exclude<TailMode, "none">
    segmentsCount: number,
    tailBends: number[]
  },

  snout: {
    mode: "none"
  } | {
    mode: "enable"
    width: number,
    height: number,
    length: number,
    offset: number
  },

  chest: {
    mode: "none"
  } | {
    mode: "enable"
    size: number
  }
}