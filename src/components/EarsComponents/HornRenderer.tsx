import {useSkinMaterial} from "../../context/SkinContext.tsx";
import {useEars} from "../../context/EarsContext.tsx";
import {hornGeometry} from "../../geometry/earsModeGeometry/hornGeometry.ts";
import DebugSphere from "../DebugSphere.tsx";

export function HornRenderer({ debug }: {debug?: boolean}) {
  const skin = useSkinMaterial();
  const protrusion = useEars(ctx => ctx.protrusions);

  if (protrusion.mode === "none" || protrusion.mode === "claws") {
    return null;
  }

  return (
    <object3D position={[0,4,4]} rotation={[ 3 * Math.PI / 4,0,0]} renderOrder={1}>
      { debug && <DebugSphere color={"#FFFF00"} /> }
      <mesh position={[0,0,-4]} rotation={[0,0,0]}
        geometry={hornGeometry} material={skin}
      />
    </object3D>
  );
}
