import {useSkinMaterial} from "../../../context/SkinContext.tsx";
import {useEars} from "../../../context/EarsContext.tsx";
import {getSnoutBodyGeometry, getSnoutFaceGeometry} from "../../../geometry/earsModeGeometry/snoutGeometry.ts";
import {Vector3} from "three";
import DebugSphere from "../../DebugSphere.tsx";

function getSnoutPose(length: number, offset: number, height: number) {
  const bodyLength = length - 1;
  const snoutPosition = new Vector3(0, -4 + offset, 4);
  const snoutRootPosition = new Vector3(0, height / 2, 0)
  const snoutBodyPosition = new Vector3(0, 0, bodyLength / 2);
  const snoutFacePosition = new Vector3(0, 0, bodyLength + 1 / 2)
  return {snoutPosition, snoutRootPosition, snoutBodyPosition, snoutFacePosition};
}

export function SnoutRender({ debug }: { debug?: boolean }) {
  const skin = useSkinMaterial();
  const snout = useEars(ctx => ctx.snout);

  if (snout.mode === "none") {
    return null;
  }

  const { width, height, length, offset } = snout;

  const snoutFrontGeometry = getSnoutFaceGeometry(width, height);
  const snoutBodyGeometry = getSnoutBodyGeometry(width, height, length);
  const {
    snoutPosition,
    snoutRootPosition,
    snoutBodyPosition,
    snoutFacePosition
  } = getSnoutPose(length, offset, height);

  return (
    <object3D name={"snout"} position={snoutPosition}>
      { debug && <DebugSphere /> }
      <group position={snoutRootPosition}>
        <mesh position={snoutBodyPosition}
          geometry={snoutBodyGeometry} material={skin} />
        <mesh position={snoutFacePosition}
          geometry={snoutFrontGeometry} material={skin} />
      </group>
    </object3D>
  );
}