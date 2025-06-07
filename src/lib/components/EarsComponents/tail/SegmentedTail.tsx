import {type BufferGeometry, type Material, Vector3} from "three";
import type {ReactNode} from "react";
import {useSkinMaterial} from "../../../context/SkinContext.tsx";
import {
  tailGeometry,
  tail2BendGeometry,
  tail3BendGeometry,
  tail4BendGeometry
} from "../../../geometry/earsModeGeometry/tailGeometry.ts";
import DebugSphere from "../../DebugSphere.tsx";

function degreesToRadian(degrees: number) {
  return degrees * Math.PI / 180;
}

const getSegmentRotation = (degrees: number) => [0,0,degreesToRadian(degrees)] as const;

const tailGeometryMap: Record<number, BufferGeometry[]> = {
  1: tailGeometry,
  2: tail2BendGeometry,
  3: tail3BendGeometry,
  4: tail4BendGeometry
}

export type SegmentMeshFactory = (meshBaseOffset: Vector3, geometry: BufferGeometry, material: Material, index: number) => ReactNode;

function TailSegment({
 index,
 tailBends,
 segmentMeshFactory,
 debug,
}: {
  index: number,
  tailBends: number[],
  segmentMeshFactory?: SegmentMeshFactory,
  debug?: boolean,
}): ReactNode {
  if (index >= tailBends.length) return null;

  const skin = useSkinMaterial();

  const segmentCount = tailBends.length;
  const segmentGeometry = tailGeometryMap[segmentCount];
  const segmentLength = 12 / segmentCount;
  const segmentHalfLength = segmentLength / 2;

  const meshBaseOffset = new Vector3(segmentHalfLength, 0, 0);
  const groupBaseOffset = new Vector3(segmentLength, 0, 0);

  const rotation = getSegmentRotation(tailBends[index]);
  const offset = index !== 0 ? groupBaseOffset : new Vector3(0, 0, 0);

  const children = TailSegment({
    index: index + 1,
    tailBends,
    segmentMeshFactory,
    debug,
  });

  return (
    <group position={offset} rotation={rotation} >
      {
        segmentMeshFactory
          ? segmentMeshFactory(meshBaseOffset.clone(), segmentGeometry[index], skin, index)
          : <mesh key={index} position={meshBaseOffset} renderOrder={1}
                  geometry={segmentGeometry[index]} material={skin} />
      }

      {
        debug && <DebugSphere color={"#7f16ff"}/>
      }
      {children}
    </group>
  );
}


export function SegmentedTail({
 tailBends,
 debug,
 segmentMeshFactory
}: {
  tailBends: number[],
  debug?: boolean,
  segmentMeshFactory?: SegmentMeshFactory
}) {
  return <TailSegment index={0} tailBends={tailBends} segmentMeshFactory={segmentMeshFactory} debug={debug} />;
}