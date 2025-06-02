import {useEars} from "../../../context/EarsContext.tsx";
import {widePlaneGeometry} from "../../../geometry/earsModeGeometry/widePlaneGeometry.ts";
import {useSkinMaterial} from "../../../context/SkinContext.tsx";
import {leftWidePlaneHalf, rightWidePlaneHalf} from "../../../geometry/earsModeGeometry/widePlaneHalfGeometry.ts";
import {
  leftEarSmallPlaneGeometry,
  rightEarSmallPlaneGeometry
} from "../../../geometry/earsModeGeometry/earSmallPlaneGeometry.ts";
import DebugSphere from "../../DebugSphere.tsx";
import {Vector3} from "three";
import {ANCHOR_POSITION_MAP, OUT_MODE_ANCHOR_CONFIG} from "./earAnchorModeConfigs.ts";

export function EarRenderer({ debug }: { debug?: boolean }) {
  const skin = useSkinMaterial();
  const ear = useEars((ctx) => ctx.ear);

  if (ear.mode === "none") {
    return null;
  }

  const anchorPosition = ANCHOR_POSITION_MAP[ear.anchor];

  switch (ear.mode) {
    case "above":
      return (
        <group name={"above"} position={anchorPosition}>
          <object3D position={[0, 4, 0]} rotation={[0, 0, 0]} renderOrder={1}>
            <mesh position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]}
                  geometry={widePlaneGeometry} material={skin}/>
            { debug && <DebugSphere color={"#FFFF00"} /> }
          </object3D >
        </group>
      );
    case "sides":
      return (
        <group name={"sides"} position={anchorPosition}>
          <object3D position={[4, 0, 0]} rotation={[0, 0, 0]} renderOrder={1}>
            <mesh position={[4, 0, 0]} rotation={[Math.PI / 2, 0, 0]}
                  geometry={rightWidePlaneHalf}
                  material={skin}
            />
            { debug && <DebugSphere /> }
          </object3D>
          <object3D position={[-4, 0, 0]} rotation={[0, 0, 0]} renderOrder={1}>
            <mesh position={[-4, 0, 0]} rotation={[Math.PI / 2, 0, 0]}
                  geometry={leftWidePlaneHalf}
                  material={skin}
            />
            { debug && <DebugSphere /> }
          </object3D>
        </group>
      );
    case "cross":
      return (
        <group name={"cross"} position={anchorPosition}>
          <object3D position={[0, 4, 0]} rotation={[Math.PI / 2, Math.PI / 4, 0, "YXZ"]} renderOrder={1}>
            <mesh position={[0, 0, -4]} rotation={[0, 0, 0]}
                  geometry={rightWidePlaneHalf}
                  material={skin}
            />
            { debug && <DebugSphere /> }
          </object3D>
          <object3D position={[0, 4, 0]} rotation={[Math.PI / 2, -Math.PI / 4, 0, "YXZ"]} renderOrder={1}>
            <mesh position={[0, 0, -4]} rotation={[0, 0, 0]}
                  geometry={leftWidePlaneHalf}
                  material={skin}
            />
            { debug && <DebugSphere /> }
          </object3D>
        </group>
      );
    case "around":
      return (
        <group name={"around"} position={anchorPosition}>
          <object3D position={[0, 4, 0]} rotation={[0, 0, 0]} renderOrder={1}>
            <mesh position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]}
                  geometry={widePlaneGeometry} material={skin}/>
            { debug && <DebugSphere /> }
          </object3D>
          <object3D position={[4, 0, 0]} rotation={[Math.PI / 2, 0, 0]} renderOrder={1}>
            <mesh position={[2, 0, 0]} rotation={[0, Math.PI / 2, 0]}
                  geometry={rightEarSmallPlaneGeometry} material={skin}/>
            { debug && <DebugSphere /> }
          </object3D>
          <object3D position={[-4, 0, 0]} rotation={[Math.PI / 2, 0, 0]} renderOrder={1}>
            <mesh position={[-2, 0, 0]} rotation={[0, Math.PI / 2, 0]}
                  geometry={leftEarSmallPlaneGeometry} material={skin}/>
            { debug && <DebugSphere /> }
          </object3D>
        </group>
      );
    case "tall":
      return (
        <group name={"tall"} position={anchorPosition}>
          <object3D position={[0, 4, 0]} rotation={[0, Math.PI / 2, Math.PI / 2, "YXZ"]} renderOrder={1}>
            <mesh position={[8, 0, 0]} rotation={[0, 0, 0]}
                  geometry={widePlaneGeometry} material={skin}/>
            { debug && <DebugSphere /> }
          </object3D>
        </group>
      );
    case "tallCross":
      return (
        <group name={"tailCross"} position={anchorPosition}>
          <object3D position={[0, 4, 0]} rotation={[0, 3 * Math.PI / 4, Math.PI / 2, "YXZ"]} renderOrder={1}>
            <mesh position={[8, 0, 0]} rotation={[0, 0, 0]}
                  geometry={widePlaneGeometry} material={skin}/>
            { debug && <DebugSphere /> }
          </object3D>
          <object3D position={[0, 4, 0]} rotation={[0, Math.PI / 4, Math.PI / 2, "YXZ"]} renderOrder={1}>
            <mesh position={[8, 0, 0]} rotation={[0, 0, 0]}
                  geometry={widePlaneGeometry} material={skin}/>
            { debug && <DebugSphere /> }
          </object3D>
        </group>
      );
    case "out": {
      const { position, meshPosition } = OUT_MODE_ANCHOR_CONFIG[ear.anchor];

      const oppPosition = position.clone().setX(position.x * -1);
      const meshOppPosition = new Vector3(-meshPosition.x, meshPosition.y, -meshPosition.z)

      return (
        <group name={"out"}>
          <object3D position={position} rotation={[0, Math.PI / 2, 0]} renderOrder={1}>
            <mesh position={meshPosition} rotation={[Math.PI / 2, 0, 0]}
                  geometry={rightWidePlaneHalf}
                  material={skin}
            />
            {debug && <DebugSphere/>}
          </object3D>
          <object3D position={oppPosition} rotation={[0, -Math.PI / 2, 0]} renderOrder={1}>
            <mesh position={meshOppPosition} rotation={[Math.PI / 2, 0, 0]}
                  geometry={leftWidePlaneHalf}
                  material={skin}
            />
            {debug && <DebugSphere/>}
          </object3D>
        </group>
      );
    }
    case "floppy":
      return (
        <group name={"floppy"}>
          <object3D position={[-4, 3, 0]} rotation={[0, 0, Math.PI / 3]} renderOrder={1}>
            <mesh position={[-4, 0, 0]} rotation={[0, -Math.PI / 2, 0]}
                  geometry={leftWidePlaneHalf}
                  material={skin}
            />
            { debug && <DebugSphere /> }
          </object3D>
          <object3D rotation={[0, 0, -Math.PI / 3]} position={[4, 3, 0]} renderOrder={1}>
            <mesh position={[4, 0, 0]} rotation={[0, Math.PI / 2, 0]}
                  geometry={rightWidePlaneHalf}
                  material={skin}
            />
            { debug && <DebugSphere /> }
          </object3D>
        </group>
      );
    default:
      return null;
  }

}
