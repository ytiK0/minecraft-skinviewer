import {useEars} from "../../context/EarsContext.tsx";
import {widePlaneGeometry} from "../../geometry/earsModeGeometry/widePlaneGeometry.ts";
import {useSkinMaterial} from "../../context/SkinContext.tsx";
import {leftWidePlaneHalf, rightWidePlaneHalf} from "../../geometry/earsModeGeometry/widePlaneHalfGeometry.ts";
import {
  leftEarSmallPlaneGeometry,
  rightEarSmallPlaneGeometry
} from "../../geometry/earsModeGeometry/earSmallPlaneGeometry.ts";

export function EarRenderer() {
  const skin = useSkinMaterial();
  const ear = useEars((ctx) => ctx.ear);

  if (ear.mode === "none") {
    return null;
  }

  switch (ear.mode) {
    case "above":
      return (
        <object3D position={[0,4,0]} rotation={[0,0,0]} renderOrder={1}>
          <mesh position={[0,4,0]} rotation={[Math.PI / 2,0,0]}
            geometry={widePlaneGeometry} material={skin} />
        </object3D>
      );
    case "floppy":
      return (
        <>
          <object3D rotation={[0, 0, Math.PI / 3]} position={[-4, 3, 0]} renderOrder={1}>
            <mesh position={[-4, 0, 0]} rotation={[0, -Math.PI / 2, 0]}
                  geometry={leftWidePlaneHalf}
                  material={skin}
            />
          </object3D>
          <object3D rotation={[0, 0, -Math.PI / 3]} position={[4, 3, 0]} renderOrder={1}>
            <mesh position={[4, 0, 0]} rotation={[0, Math.PI / 2, 0]}
                  geometry={rightWidePlaneHalf}
                  material={skin}
            />
          </object3D>
        </>
      );
    case "out":
      return (
        <>
          <object3D position={[4, 4, 0]} rotation={[0, 0, -Math.PI / 2]} renderOrder={1}>
            <mesh position={[-4, 0, 0]} rotation={[0,Math.PI / 2,0]}
              geometry={rightWidePlaneHalf}
              material={skin}
            />
          </object3D>
          <object3D position={[-4, 4, 0]} rotation={[0,0,Math.PI/2]} renderOrder={1}>
            <mesh position={[4, 0, 0]} rotation={[0, -Math.PI / 2, 0]}
              geometry={leftWidePlaneHalf}
              material={skin}
            />
          </object3D>
        </>
      );
    case "sides":
      return (
        <>
          <object3D position={[4, 0, 0]} rotation={[0, 0, 0]} renderOrder={1}>
            <mesh position={[4, 0, 0]} rotation={[Math.PI / 2, 0, 0]}
                  geometry={rightWidePlaneHalf}
                  material={skin}
            />
          </object3D>
          <object3D position={[-4 , 0, 0]} rotation={[0, 0, 0]} renderOrder={1}>
            <mesh position={[-4, 0, 0]} rotation={[Math.PI / 2, 0, 0]}
                  geometry={leftWidePlaneHalf}
                  material={skin}
            />
          </object3D>
        </>
      );
    case "cross":
      return (
        <>
          <object3D position={[0, 4, 0]} rotation={[Math.PI / 2, Math.PI / 4, 0, "YXZ"]} renderOrder={1}>
            <mesh position={[0, 0, -4]} rotation={[0, 0, 0]}
                  geometry={rightWidePlaneHalf}
                  material={skin}
            />
          </object3D>
          <object3D position={[0, 4, 0]} rotation={[Math.PI / 2, -Math.PI / 4, 0, "YXZ"]} renderOrder={1}>
            <mesh position={[0, 0, -4]} rotation={[0, 0, 0]}
                  geometry={leftWidePlaneHalf}
                  material={skin}
            />
          </object3D>
        </>
      );
    case "tall":
      return (
        <object3D position={[0, 4, 0]} rotation={[0, Math.PI / 2, Math.PI / 2, "YXZ"]} renderOrder={1}>
          <mesh position={[8, 0, 0]} rotation={[0, 0, 0]}
                geometry={widePlaneGeometry} material={skin}/>
        </object3D>
      );
    case "tallCross":
      return (
        <>
          <object3D position={[0, 4, 0]} rotation={[0, 3 * Math.PI / 4, Math.PI / 2, "YXZ"]} renderOrder={1}>
            <mesh position={[8, 0, 0]} rotation={[0, 0, 0]}
                  geometry={widePlaneGeometry} material={skin}/>
          </object3D>
          <object3D position={[0, 4, 0]} rotation={[0, Math.PI / 4, Math.PI / 2, "YXZ"]} renderOrder={1}>
            <mesh position={[8, 0, 0]} rotation={[0, 0, 0]}
                  geometry={widePlaneGeometry} material={skin}/>
          </object3D>
        </>
      );
    case "around":
      return (
        <>
          <object3D position={[0, 4, 0]} rotation={[0, 0, 0]} renderOrder={1}>
            <mesh position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]}
                  geometry={widePlaneGeometry} material={skin}/>
          </object3D>
          <object3D position={[4, 0, 0]} rotation={[Math.PI / 2, 0, 0]} renderOrder={1}>
            <mesh position={[2, 0, 0]} rotation={[0, Math.PI / 2, 0]}
                  geometry={rightEarSmallPlaneGeometry} material={skin}/>
          </object3D>
          <object3D position={[-4, 0, 0]} rotation={[Math.PI / 2, 0, 0]} renderOrder={1}>
            <mesh position={[-2, 0, 0]} rotation={[0, Math.PI / 2, 0]}
                  geometry={leftEarSmallPlaneGeometry} material={skin}/>
          </object3D>
        </>
      );
    default:
      return null;
  }

}
