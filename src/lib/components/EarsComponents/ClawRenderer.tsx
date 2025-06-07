import {useSkinMaterial} from "../../context/SkinContext.tsx";
import {useEars} from "../../context/EarsContext.tsx";
import {
  lArmClawGeometry,
  lLegClawGeometry,
  rArmClawGeometry,
  rLegClawGeometry
} from "../../geometry/earsModeGeometry/clawGeometry.ts";
import DebugSphere from "../DebugSphere.tsx";
import {useLayers} from "../../context/LayersContext.tsx";

interface ClawRendererProps {
  clawSide: "lArm" | "rArm" | "lLeg" | "rLeg",
  debug?: boolean
}

export function ClawRenderer({ clawSide, debug }: ClawRendererProps) {
  const skin = useSkinMaterial();
  const protrusions = useEars(ctx => ctx.protrusions);
  const {
    isBaseVisible
  } = useLayers(ctx => ctx.protrusion);

  if (protrusions.mode === "none" || protrusions.mode === "horn" || !isBaseVisible) {
    return null;
  }

  switch (clawSide) {
    case "lLeg":
      return (
        <object3D position={[0,-6,2]} rotation={[0,Math.PI,0]} renderOrder={1}>
          <mesh position={[0,0,-2]} rotation={[0,0,0]}
            geometry={lLegClawGeometry} material={skin} />
          { debug && <DebugSphere color={"#ff10d7"} />}
        </object3D>
      );
    case "rLeg":
      return (
        <object3D position={[0,-6,2]} rotation={[0,Math.PI,0]} renderOrder={1}>
          <mesh position={[0,0,-2]} rotation={[0,0,0]}
                geometry={rLegClawGeometry} material={skin} />
          { debug && <DebugSphere color={"#ff10d7"} />}
        </object3D>
      );
    case "lArm":
      return (
        <object3D position={[2,-6,0]} rotation={[-Math.PI / 2,-Math.PI / 2,0, "YXZ"]} renderOrder={1}>
          <mesh position={[0,0,-2]} rotation={[0,0,0]}
                geometry={lArmClawGeometry} material={skin} />
          { debug && <DebugSphere color={"#ff10d7"} />}
        </object3D>
      );
    case "rArm":
      return (
        <object3D position={[-2,-6,0]} rotation={[-Math.PI / 2, Math.PI / 2,0, "YXZ"]} renderOrder={1}>
          <mesh position={[0,0,-2]} rotation={[0,0,0]}
                geometry={rArmClawGeometry} material={skin} />
          { debug && <DebugSphere color={"#ff10d7"} />}
        </object3D>
      );
    default:
      return null;
  }
}