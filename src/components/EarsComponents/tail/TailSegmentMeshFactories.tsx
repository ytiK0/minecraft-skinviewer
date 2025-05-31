import type {SegmentMeshFactory} from "./SegmentedTail.tsx";

const crossMeshFactory: SegmentMeshFactory = (meshBaseOffset, segmentGeometry, skin, segmentIndex) => {
  const offset = meshBaseOffset.clone().setZ(meshBaseOffset.z + segmentIndex * 0.001);

  return (
    <>
      <mesh position={offset} renderOrder={segmentIndex + 2}
            geometry={segmentGeometry} material={skin}/>
      <mesh position={offset} rotation={[Math.PI / 2, 0, 0]} renderOrder={segmentIndex + 2}
            geometry={segmentGeometry} material={skin}/>
    </>
  );
}


const starMeshFactory: SegmentMeshFactory = (meshBaseOffset, segmentGeometry, skin, segmentIndex) => {
  const offset = meshBaseOffset.clone().setZ(meshBaseOffset.z + segmentIndex * 0.001);

  return (
    <>
      <mesh position={offset} rotation={[0, 0, 0]} renderOrder={segmentIndex + 2}
            geometry={segmentGeometry} material={skin}/>
      <mesh position={offset} rotation={[-Math.PI / 2, 0, 0]} renderOrder={segmentIndex + 2}
            geometry={segmentGeometry} material={skin}/>
      <mesh position={offset} rotation={[-Math.PI / 4, 0, 0]} renderOrder={segmentIndex + 2}
            geometry={segmentGeometry} material={skin}/>
      <mesh position={offset} rotation={[Math.PI / 4, 0, 0]} renderOrder={segmentIndex + 2}
            geometry={segmentGeometry} material={skin}/>
    </>
  );
};

export const meshFactories = {
  cross: crossMeshFactory,
  star: starMeshFactory
}