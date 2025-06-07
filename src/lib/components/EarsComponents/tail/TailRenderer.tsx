import {useEars} from "../../../context/EarsContext.tsx";
import {Euler} from "three";
import {TailRoot} from "./TailRoot.tsx";
import {SegmentedTail} from "./SegmentedTail.tsx";
import {meshFactories} from "./TailSegmentMeshFactories.tsx";
import type {TailMode} from "../../../types";
import {useLayers} from "../../../context/LayersContext.tsx";

const DEFAULT_ROTATIONS = {
  "down": new Euler(0, Math.PI / 2, -Math.PI / 3),
  "up": new Euler(0, Math.PI / 2,  2 * Math.PI / 9),
  "vertical": new Euler(Math.PI / 2, Math.PI / 2, 0, "YXZ"),

  "back": new Euler(0, Math.PI / 2, -Math.PI / 12),

  "horizontal": new Euler(0, Math.PI / 2, 0)
}

function getTailRotation(mode: TailMode, bends: number[]): Euler {
  switch (mode) {
    case "down": return DEFAULT_ROTATIONS["down"];
    case "up": return DEFAULT_ROTATIONS["up"];
    case "vertical": return DEFAULT_ROTATIONS["vertical"]
    case "back":
    case "cross":
    case "star":
      return bends[0] === 0 ? DEFAULT_ROTATIONS["back"] : DEFAULT_ROTATIONS["horizontal"];

    default: return new Euler(0,0,0);
  }
}

export function TailRenderer({ debug }: { debug?: boolean }) {
  const tail = useEars(ctx => ctx.tail);
  const {
    isBaseVisible
  } = useLayers(ctx => ctx.tail);

  if (tail.mode === "none" || !isBaseVisible) {
    return null;
  }

  switch (tail.mode) {
    case "down":
    case "back":
    case "up":
    case "vertical": {
      const rotation = getTailRotation(tail.mode, tail.tailBends)
      return (
        <TailRoot rotation={rotation}>
          <SegmentedTail tailBends={tail.tailBends} debug={debug}/>
        </TailRoot>
      );
    }

    case "cross":
    case "star": {
      const rotation = getTailRotation(tail.mode, tail.tailBends);

      return (
        <TailRoot rotation={rotation}>
          <SegmentedTail tailBends={tail.tailBends} segmentMeshFactory={meshFactories[tail.mode]} debug={debug}/>
        </TailRoot>
      );
    }

    default:
      return null;
  }
}